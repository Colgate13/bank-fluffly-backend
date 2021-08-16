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
var uuidv4_1 = require("uuidv4");
var AppError_1 = __importDefault(require("../errors/AppError"));
var TransactionsRepository_1 = __importDefault(require("../repositorys/TransactionsRepository"));
var Transactions_1 = __importDefault(require("../models/Transactions"));
var User_1 = __importDefault(require("../models/User"));
var TransactionsService = /** @class */ (function () {
    function TransactionsService() {
    }
    // eslint-disable-next-line class-methods-use-this
    TransactionsService.prototype.execute = function (_a) {
        var sender_id = _a.sender_id, keyFree = _a.keyFree, password = _a.password, value = _a.value;
        return __awaiter(this, void 0, void 0, function () {
            var accontRepository, accontExistsSender_id, accontExistsfreeKey, passwordMatched, balanceSender, balanceAdress;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        accontRepository = typeorm_1.getRepository(User_1.default);
                        return [4 /*yield*/, accontRepository.findOne({
                                where: { id: sender_id },
                            })];
                    case 1:
                        accontExistsSender_id = _b.sent();
                        return [4 /*yield*/, accontRepository.findOne({
                                where: { key_free: keyFree },
                            })];
                    case 2:
                        accontExistsfreeKey = _b.sent();
                        if (!accontExistsSender_id) {
                            throw new AppError_1.default("Accont do not Exist sender_id=" + sender_id, 400);
                        }
                        if (!accontExistsfreeKey) {
                            throw new AppError_1.default("Accont do not Exist keyFree=" + keyFree, 400);
                        }
                        return [4 /*yield*/, bcryptjs_1.compare(password, accontExistsSender_id.password)];
                    case 3:
                        passwordMatched = _b.sent();
                        if (!passwordMatched) {
                            throw new AppError_1.default('Incorrect email/password combination.', 401);
                        }
                        if (value <= 0) {
                            throw new AppError_1.default('You do not Deposity <= 0', 401);
                        }
                        if (Number(accontExistsSender_id.balance) <= value) {
                            throw new AppError_1.default('You do not have is value', 401);
                        }
                        if (accontExistsSender_id.key_free === accontExistsfreeKey.key_free) {
                            throw new AppError_1.default('You do not send for you', 401);
                        }
                        balanceSender = (Number(accontExistsSender_id.balance));
                        balanceAdress = (Number(accontExistsfreeKey.balance));
                        if (balanceAdress === 0) {
                            balanceSender -= value;
                            balanceAdress = value;
                        }
                        else {
                            balanceSender -= value;
                            balanceAdress += value;
                        }
                        accontExistsSender_id.balance = balanceSender.toString();
                        accontExistsfreeKey.balance = balanceAdress.toString();
                        return [4 /*yield*/, accontRepository.save(accontExistsSender_id)];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, accontRepository.save(accontExistsfreeKey)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, accontExistsSender_id];
                }
            });
        });
    };
    TransactionsService.prototype.log = function (_a) {
        var sender_keyFree = _a.sender_keyFree, keyFree = _a.keyFree, message = _a.message, value = _a.value;
        return __awaiter(this, void 0, void 0, function () {
            var transactionsRepository, transaction;
            return __generator(this, function (_b) {
                transactionsRepository = typeorm_1.getRepository(Transactions_1.default);
                transaction = transactionsRepository.create({
                    id: uuidv4_1.uuid(),
                    sender_keyFree: sender_keyFree,
                    addressee_keyFree: keyFree,
                    message: message,
                    value: value.toString(),
                });
                transactionsRepository.save(transaction);
                return [2 /*return*/, transaction];
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    TransactionsService.prototype.listAllTransactions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var transactionsRepository, checkFreeKeyExists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transactionsRepository = typeorm_1.getCustomRepository(TransactionsRepository_1.default);
                        return [4 /*yield*/, transactionsRepository.find()];
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
    return TransactionsService;
}());
exports.default = TransactionsService;
