"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var auth_1 = __importDefault(require("../config/auth"));
var AppError_1 = __importDefault(require("../errors/AppError"));
function ensureAuthenticated(request, response, next) {
    var authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.default('TOKEN IS MISSING', 403);
    }
    // Bearer lkjadlgkjdlfgkjçsdlkfgjdlkjfgçsldkjfgçlksdjfgçlksjdfçglkjsdfgçlkjsdçfgkj
    // [, token] -> Quer fizer que eu não quero os primeiro elementro, quero somente o segundo
    var _a = authHeader.split(' '), token = _a[1];
    try {
        var decoder = jsonwebtoken_1.verify(token, auth_1.default.jwt.secret);
        var sub = decoder.sub; // Forcnado o decoder ter as tipagens do TokenPayLoad
        request.user = {
            id: sub,
        };
        return next(); // Com esse comando vamos passar o ID para todas as rotas, assim podemos mostrar
        // Conteudo personalizado, limitado ou algo assim para casa user, deixei um
        // console.log(request.user) Na rota de listagem, olha e testa la
    }
    catch (_b) {
        throw new AppError_1.default('Invalid JWT token', 403);
    }
}
exports.default = ensureAuthenticated;
