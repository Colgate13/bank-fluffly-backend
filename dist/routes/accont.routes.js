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
var express_1 = require("express");
var AccontFindsService_1 = __importDefault(require("../services/AccontFindsService"));
var AccontMoneyService_1 = __importDefault(require("../services/AccontMoneyService"));
var TransactionsService_1 = __importDefault(require("../services/TransactionsService"));
var ensureAuthenticated_1 = __importDefault(require("../middlewares/ensureAuthenticated"));
var LogAccontService_1 = __importDefault(require("../services/LogAccontService"));
var accontRouter = express_1.Router();
accontRouter.post('/FindkeyFree', ensureAuthenticated_1.default, function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var keyFree, FindAccontKeyFree, accont;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                keyFree = request.body.keyFree;
                FindAccontKeyFree = new AccontFindsService_1.default();
                return [4 /*yield*/, FindAccontKeyFree.findAccontKeyFree(keyFree)];
            case 1:
                accont = _a.sent();
                return [2 /*return*/, response.json(accont)];
        }
    });
}); });
accontRouter.post('/FindId', ensureAuthenticated_1.default, function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, FindAccontId, accont;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.body.id;
                FindAccontId = new AccontFindsService_1.default();
                return [4 /*yield*/, FindAccontId.findAccontId(id)];
            case 1:
                accont = _a.sent();
                return [2 /*return*/, response.json(accont)];
        }
    });
}); });
accontRouter.post('/deposity', ensureAuthenticated_1.default, function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, passwordAccont, value, createAccont, accont;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, passwordAccont = _a.passwordAccont, value = _a.value;
                createAccont = new AccontMoneyService_1.default();
                return [4 /*yield*/, createAccont.deposity({
                        id: request.user.id,
                        password: passwordAccont,
                        value: value,
                    })];
            case 1:
                accont = _b.sent();
                return [2 /*return*/, response.json(accont)];
        }
    });
}); });
accontRouter.post('/withdraw', ensureAuthenticated_1.default, function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, passwordAccont, value, createAccont, accont;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, passwordAccont = _a.passwordAccont, value = _a.value;
                createAccont = new AccontMoneyService_1.default();
                return [4 /*yield*/, createAccont.withdraw({
                        id: request.user.id,
                        password: passwordAccont,
                        value: value,
                    })];
            case 1:
                accont = _b.sent();
                return [2 /*return*/, response.json(accont)];
        }
    });
}); });
accontRouter.post('/transactions', ensureAuthenticated_1.default, function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keyFree, password, message, value, transactionsService, transaction, transactionLog;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, keyFree = _a.keyFree, password = _a.password, message = _a.message, value = _a.value;
                transactionsService = new TransactionsService_1.default();
                return [4 /*yield*/, transactionsService.execute({
                        sender_id: request.user.id,
                        keyFree: keyFree,
                        password: password,
                        value: value,
                    })];
            case 1:
                transaction = _b.sent();
                return [4 /*yield*/, transactionsService.log({
                        sender_keyFree: transaction.key_free,
                        keyFree: keyFree,
                        message: message,
                        value: value,
                    })];
            case 2:
                transactionLog = _b.sent();
                return [2 /*return*/, response.json(transactionLog)];
        }
    });
}); });
accontRouter.get('/logs/internal', ensureAuthenticated_1.default, function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var logAccontService, transaction;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logAccontService = new LogAccontService_1.default();
                return [4 /*yield*/, logAccontService.search(request.user.id)];
            case 1:
                transaction = _a.sent();
                return [2 /*return*/, response.json(transaction)];
        }
    });
}); });
accontRouter.get('/logs/transactions', ensureAuthenticated_1.default, function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var transactionsService, transaction;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                transactionsService = new TransactionsService_1.default();
                return [4 /*yield*/, transactionsService.search(request.user.id)];
            case 1:
                transaction = _a.sent();
                return [2 /*return*/, response.json(transaction)];
        }
    });
}); });
accontRouter.get('/logs/all', ensureAuthenticated_1.default, function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var transactionsService, transaction, logAccontService, internal;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                transactionsService = new TransactionsService_1.default();
                return [4 /*yield*/, transactionsService.search(request.user.id)];
            case 1:
                transaction = _a.sent();
                logAccontService = new LogAccontService_1.default();
                return [4 /*yield*/, logAccontService.search(request.user.id)];
            case 2:
                internal = _a.sent();
                return [2 /*return*/, response.json({ transaction: transaction, internal: internal })];
        }
    });
}); });
exports.default = accontRouter;
