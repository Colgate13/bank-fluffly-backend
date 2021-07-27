"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("express-async-errors"); // PRECISA FICAR LOGO ABAIXO DO EXPRESS
var cors_1 = __importDefault(require("cors"));
var index_1 = __importDefault(require("./routes/index"));
var AppError_1 = __importDefault(require("./errors/AppError"));
require("./database");
var PORT = process.env.PORT || 3131;
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(index_1.default);
app.use(function (err, request, response, _next) {
    // SE O ERRO FOR CONHECIDO, OU SEJA FOI USADO O AppError, ele retorna a mensagem
    // Passada no AppError e o statusCode
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    // Se a mensagem não for conhecida, ou seja, não usamos o AppError, ele retorna Erro internal
    // statusCode 500
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
app.listen(PORT, function () { return console.log("\uD83D\uDC31\u200D\uD83D\uDC64> Server running! \uD83E\uDDDB\u200D\u2640\uFE0F " + PORT); });
