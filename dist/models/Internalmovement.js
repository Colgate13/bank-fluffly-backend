"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
// KISS -> Keep It Simple & Stupid
var LogTrade = /** @class */ (function () {
    function LogTrade() {
    }
    __decorate([
        typeorm_1.PrimaryColumn('uuid'),
        __metadata("design:type", String)
    ], LogTrade.prototype, "id", void 0);
    __decorate([
        typeorm_1.PrimaryColumn('uuid'),
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], LogTrade.prototype, "accont_id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], LogTrade.prototype, "type", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], LogTrade.prototype, "value", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], LogTrade.prototype, "created_at", void 0);
    LogTrade = __decorate([
        typeorm_1.Entity('internalmovement')
    ], LogTrade);
    return LogTrade;
}());
exports.default = LogTrade;
