"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractDb_1 = require("../db/AbstractDb");
const moment = require("moment");
class AtendimentoService extends AbstractDb_1.AbstractDb {
    constructor() {
        super(...arguments);
        this.atendimentoList = [];
        this.datas = [];
    }
    getAll() {
        return this.getAllMethod('atendimento');
    }
    createNewAtendimento(atendimento) {
        if (!this.validarData(atendimento.data.inicio, atendimento.data.fim)) {
            return 'Data invalida';
        }
        if (this.verificarDisponibilidade(atendimento)) {
            return 'Horário preenchido';
        }
        atendimento.id = this.gerarId();
        return this.createMethod('atendimento', atendimento);
    }
    remover(dia) {
        console.dir(dia);
        return this.removeAtendimentoMethod(dia);
    }
    getAtendimentoFilter(intervalo) {
        this.atendimentoList = this.getDiaDisponiveisMethod();
        this.atendimentoList.forEach(atendimento => {
            const inicio = moment(intervalo.inicio, 'DD-MM-YYYY');
            const fim = moment(intervalo.fim, 'DD-MM-YYYY');
            const datas = moment(atendimento.data.inicio, 'DD-MM-YYYY');
            console.dir(intervalo);
            if (datas.isBetween(inicio, fim) || datas.isSame(inicio) || datas.isSame(fim)) {
                this.datas.push(atendimento);
            }
        });
        return this.datas;
    }
    gerarId() {
        let total = this.getLength('atendimento');
        const novoId = total + 1;
        return novoId;
    }
    validarData(dataInicio, dataFim) {
        if (moment(dataInicio, "DD-MM-YYYY").isBefore(Date.now())) {
            return false;
        }
        if (moment(dataInicio, "DD-MM-YYYY").isValid() && moment(dataFim, "DD-MM-YYYY").isValid()) {
            return true;
        }
        return false;
    }
    verificarDisponibilidade(atendimento) {
        this.atendimentoList = this.getDiaDisponiveisMethod();
        if (this.atendimentoList.length === 0) {
            return false;
        }
        const retorno = this.atendimentoList.map((dataInicio) => {
            return moment(dataInicio.data.inicio, 'DD-MM-YYYY').isSame(moment(atendimento.data.inicio, 'DD-MM-YYYY'));
        });
        return retorno.indexOf(true) !== -1;
    }
}
exports.AtendimentoService = AtendimentoService;
