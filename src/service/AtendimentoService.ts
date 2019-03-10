import {AbstractDb} from "../db/AbstractDb";
import {Atendimento} from "../models/Atendimento";
import {Intervalo} from "../models/Intervalo";
import * as moment from "moment";
import {TipoEnum} from "../enum/TipoEnum";
import {pipe} from "rxjs";

export class AtendimentoService extends AbstractDb {

    private atendimentoList: Atendimento[] = [];
    private datas:Atendimento[] = [];

    getAll() {
        return this.getAllMethod('atendimento');
    }



    createNewAtendimento(atendimento:Atendimento) {

        if(!this.validarData(atendimento.data.inicio,atendimento.data.fim)) { return 'Data invalida' }

        if(this.verificarDisponibilidade(atendimento)) { return 'Horário preenchido'}

        atendimento.id = this.gerarId();

        return this.createMethod('atendimento',atendimento);
    }



    remover(dia:string) {
        console.dir(dia);
        return this.removeAtendimentoMethod(dia);
    }


    getAtendimentoFilter(intervalo:Intervalo) {
        this.atendimentoList = this.getDiaDisponiveisMethod();
        this.atendimentoList.forEach(atendimento => {

            const inicio = moment(intervalo.inicio,'DD-MM-YYYY');
            const fim = moment(intervalo.fim,'DD-MM-YYYY');
            const datas = moment(atendimento.data.inicio,'DD-MM-YYYY');
            console.dir(intervalo);
            if(datas.isBetween(inicio,fim) || datas.isSame(inicio) || datas.isSame(fim)) {
                this.datas.push(atendimento);
        }});
     
        return this.datas;

    }

    private gerarId():number {
        let total = this.getLength('atendimento');
        const novoId = total + 1;
        return novoId;
    }

    private validarData(dataInicio:string, dataFim:string):boolean {
        if(moment(dataInicio, "DD-MM-YYYY").isBefore(Date.now())) {
            return false ;

        }
        if(moment(dataInicio, "DD-MM-YYYY").isValid() &&  moment(dataFim, "DD-MM-YYYY").isValid()) {
            return true;
        }
        return false;
    }



    private verificarDisponibilidade(atendimento:Atendimento) {
        
        this.atendimentoList = this.getDiaDisponiveisMethod();
        if(this.atendimentoList.length === 0) {
            return false;
        }
        const retorno =  this.atendimentoList.map((dataInicio) => {
             return  moment(dataInicio.data.inicio,'DD-MM-YYYY').isSame(moment(atendimento.data.inicio,'DD-MM-YYYY'))
        });
       return retorno.indexOf(true) !== -1;
    }
}
