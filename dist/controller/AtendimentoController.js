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
const typescript_rest_1 = require("typescript-rest");
const Atendimento_1 = require("../models/Atendimento");
const Intervalo_1 = require("../models/Intervalo");
const AtendimentoService_1 = require("../service/AtendimentoService");
let AtendimentoController = class AtendimentoController {
    constructor() {
        this.atendimentoService = new AtendimentoService_1.AtendimentoService();
    }
    getAtendimento() {
        return this.atendimentoService.getAll();
    }
    createAtendimento(atendimento) {
        return this.atendimentoService.createNewAtendimento(atendimento);
    }
    removeAtendimento(data) {
        return this.atendimentoService.remover(data);
    }
    consultarAtendimentos(intervalo) {
        return this.atendimentoService.getAtendimentoFilter(intervalo);
    }
};
__decorate([
    typescript_rest_1.GET,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AtendimentoController.prototype, "getAtendimento", null);
__decorate([
    typescript_rest_1.POST,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Atendimento_1.Atendimento]),
    __metadata("design:returntype", Object)
], AtendimentoController.prototype, "createAtendimento", null);
__decorate([
    typescript_rest_1.DELETE,
    typescript_rest_1.Path('remover'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AtendimentoController.prototype, "removeAtendimento", null);
__decorate([
    typescript_rest_1.POST,
    typescript_rest_1.Path('consultar-atendimento'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Intervalo_1.Intervalo]),
    __metadata("design:returntype", void 0)
], AtendimentoController.prototype, "consultarAtendimentos", null);
AtendimentoController = __decorate([
    typescript_rest_1.Path('/atendimento')
], AtendimentoController);
exports.AtendimentoController = AtendimentoController;
