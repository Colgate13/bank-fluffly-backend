"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_routes_1 = __importDefault(require("./users.routes"));
var sessions_routes_1 = __importDefault(require("./sessions.routes"));
var accont_routes_1 = __importDefault(require("./accont.routes"));
var routes = express_1.Router();
routes.use('/users', users_routes_1.default);
routes.use('/sessions', sessions_routes_1.default);
routes.use('/acconts', accont_routes_1.default);
routes.use('/logs/accont', accont_routes_1.default);
exports.default = routes;
