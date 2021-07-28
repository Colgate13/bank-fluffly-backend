"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var bcryptjs_1 = require("bcryptjs");
var Accont_1 = __importDefault(require("../models/Accont"));
var AccontRepository_1 = __importDefault(require("../repositorys/AccontRepository"));
var AppError_1 = __importDefault(require("../errors/AppError"));
var CreateUserService = /** @class */ (function () {
    function CreateUserService() {
    }
    // eslint-disable-next-line class-methods-use-this
    CreateUserService.prototype.execute = function (_a) {
        var id = _a.id, interKey = _a.interKey, keyFree = _a.keyFree, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            var accontRepository, checkAccontExists, checkKeyFreeExists, hashedPassword, hashedInterKey, accont;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        accontRepository = typeorm_1.getRepository(Accont_1.default);
                        return [4 /*yield*/, accontRepository.findOne({
                                where: { id: id },
                            })];
                    case 1:
                        checkAccontExists = _b.sent();
                        return [4 /*yield*/, accontRepository.findOne({
                                where: { interKey: interKey },
                            })];
                    case 2:
                        checkKeyFreeExists = _b.sent();
                        if (checkAccontExists) {
                            throw new AppError_1.default('Accont Exist', 400);
                        }
                        if (checkKeyFreeExists) {
                            throw new AppError_1.default('KeyFree Exist', 400);
                        }
                        return [4 /*yield*/, bcryptjs_1.hash(password, 8)];
                    case 3:
                        hashedPassword = _b.sent();
                        return [4 /*yield*/, bcryptjs_1.hash(interKey, 2)];
                    case 4:
                        hashedInterKey = _b.sent();
                        accont = accontRepository.create({
                            id: id,
                            interKey: hashedInterKey,
                            keyFree: keyFree,
                            password: hashedPassword,
                            balance: '0',
                        });
                        return [4 /*yield*/, accontRepository.save(accont)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, accont];
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    CreateUserService.prototype.findBykeyFree = function (keyFree) {
        return __awaiter(this, void 0, void 0, function () {
            var usersRepository, checkFreeKeyExists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        usersRepository = typeorm_1.getRepository(Accont_1.default);
                        return [4 /*yield*/, usersRepository.findOne({
                                where: { keyFree: keyFree },
                            })];
                    case 1:
                        checkFreeKeyExists = _a.sent();
                        if (checkFreeKeyExists) {
                            return [2 /*return*/, checkFreeKeyExists];
                        }
                        throw new AppError_1.default('User email dont exist');
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    CreateUserService.prototype.listAllAcconts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accontRepository, checkFreeKeyExists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accontRepository = typeorm_1.getCustomRepository(AccontRepository_1.default);
                        return [4 /*yield*/, accontRepository.find()];
                    case 1:
                        checkFreeKeyExists = _a.sent();
                        if (checkFreeKeyExists) {
                            return [2 /*return*/, checkFreeKeyExists];
                        }
                        throw new AppError_1.default('Nothing acconts here', 400);
                }
            });
        });
    };
    return CreateUserService;
}());
exports.default = CreateUserService;
