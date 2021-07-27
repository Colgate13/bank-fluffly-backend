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
var Transactions = /** @class */ (function () {
    function Transactions() {
    }
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], Transactions.prototype, "sender_keyFree", void 0);
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], Transactions.prototype, "addressee_keyFree", void 0);
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], Transactions.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Transactions.prototype, "value", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Transactions.prototype, "message", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Transactions.prototype, "created_at", void 0);
    Transactions = __decorate([
        typeorm_1.Entity('transactions')
    ], Transactions);
    return Transactions;
}());
exports.default = Transactions;
