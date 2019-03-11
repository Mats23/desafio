import {AbstractDb} from "../db/AbstractDb";
import {Atendimento} from "../models/Atendimento";
import {Intervalo} from "../models/Intervalo";
import * as moment from "moment";
import {TipoEnum} from "../enum/TipoEnum";
import { Data } from "../models/Data";

export class AtendimentoService extends AbstractDb {

    private atendimentoList: Atendimento[] = [];
    private datas:Atendimento[] = [];

    getAll() {
        return this.getAllMethod('atendimento');
    }



    createNewAtendimento(atendimento:Atendimento) {
        return atendimento.map(atendimento => { 
            atendimento.id = this.gerarId();

            if(atendimento.tipo === TipoEnum.diariamente) {
                return this.cadastrarAtendimentoDiariamente(atendimento);
            }
    
            if(!this.validarData(atendimento.data.inicio,atendimento.data.fim)) { return 'Data invalida' }
    
            if(this.verificarDisponibilidade(atendimento)) { return 'Horário preenchido'}
    
    
            return this.createMethod('atendimento',atendimento);
        });
       
    }



    remover(dia:string) {
        return this.removeAtendimentoMethod(dia);
    }


    getAtendimentoFilter(intervalo:Intervalo) {
        this.atendimentoList = this.getDiaDisponiveisMethod();
        this.atendimentoList.filter(atendimento => { 
             return atendimento.data !== undefined})
        .map(atendimento => {
            const inicio = moment(intervalo.inicio,'DD-MM-YYYY');
            const fim = moment(intervalo.fim,'DD-MM-YYYY');
            const datas = moment(atendimento.data.inicio,'DD-MM-YYYY');
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

    private verificarHora(atendimento:Atendimento) {

        let intervalosDb = [];
        let intervalos = [];
        
        this.atendimentoList = this.getDiaDisponiveisMethod();

        this.atendimentoList.map(atendimentoDb => {
            atendimentoDb.intervalos.map(atendimento => {
                intervalosDb.push(atendimento.inicio);
            });
        });

        atendimento.intervalos.map(atendimento => {
            intervalos.push(atendimento.inicio);
        });

        const result = intervalosDb.map(horaDb => { 
            return  intervalos.filter(hora => { return horaDb === hora }).values().next().value;
        });
        return result.find(a => { return a !== undefined }) === undefined;
       
    }

    private cadastrarAtendimentoDiariamente(atendimento:Atendimento) {
        
        if(this.verificarHora(atendimento)) {
            return this.createMethod('atendimento',atendimento);
        }

        return 'Horário preenchido';
                 
    }

    private verificarDisponibilidade(atendimento:Atendimento) {
        this.atendimentoList = this.getDiaDisponiveisMethod();
        if(this.atendimentoList  === undefined) {
            return false;
        }
        const result = this.atendimentoList.map(atendimentoDb => {
            if(atendimento.tipo === TipoEnum.diariamente) {
                return this.verificarHora(atendimento);
            }
        });

        if(result) {
            const retorno =  this.atendimentoList
            .filter(data => { return data.data !== undefined; })
            .map((dataInicio) => {
                 return  moment(dataInicio.data.inicio,'DD-MM-YYYY').isSame(moment(atendimento.data.inicio,'DD-MM-YYYY'))
            });
            return retorno.indexOf(true) !== -1;

        }
        

        
      

    }
}
