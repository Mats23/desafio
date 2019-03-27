import {AbstractDb} from "../db/AbstractDb";
import  {Atendimento } from "../models/Atendimento";
import {Intervalo} from "../models/Intervalo";
import * as moment from "moment";
import * as MomentRange from "moment-range";
import {TipoEnum} from "../enum/TipoEnum";

export class AtendimentoService extends AbstractDb {

    private atendimentoList: Atendimento[] = [];
    private atendimentoDb: Atendimento;
    private moment = MomentRange.extendMoment(moment);

    private datas:Atendimento[] = [];

    getAll() {
        return this.getAllMethod();
    }

    createNewAtendimentoEspecifico(atendimento:Atendimento):Atendimento | string {
        atendimento.id = this.gerarId();
        if(this.getAll().length === 0 ) {
            return this.createMethod('atendimento',atendimento);
        }
        if(atendimento.tipo === TipoEnum.especifico) {
            atendimento.data = moment(atendimento.data,'DD-MM-YYYY').format('DD-MM-YYYY');

        }

        if(atendimento.tipo === TipoEnum.especifico && !this.validarData(atendimento.data)) {
                return 'Data invalida'
        }
    
        if(atendimento.tipo === TipoEnum.especifico && this.verificarDisponibilidade(atendimento)!== undefined) { 
            return 'Dia preenchido' 
        }
        if(this.horaValida(atendimento)) {
            return 'Hora Já preenchida';
        }     

        return this.createMethod('atendimento',atendimento);   
    }


    remover(id:string) {
        return this.removeAtendimentoMethod(id);
    }


    getAtendimentoFilter(intervalo:Intervalo) {
        this.atendimentoList = this.getDiaDisponiveisMethod();
        this.atendimentoList.filter(atendimento => { 
             return atendimento.data !== undefined})
        .map(atendimento => {
            const inicio = moment(intervalo.inicio,'DD-MM-YYYY');
            const fim = moment(intervalo.fim,'DD-MM-YYYY');
            const datas = moment(atendimento.data,'DD-MM-YYYY');
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

    private validarData(data:string):boolean {
        if(moment(data, "DD-MM-YYYY").isBefore(Date.now())) {
            return false ;

        }
        if(moment(data, "DD-MM-YYYY").isValid()) {
            return true;
        }
        return false;
    }


    private verificarDisponibilidade(atendimento:Atendimento) {
        const data = moment(atendimento.data,'DD-MM-YYYY').format('DD-MM-YYYY')
        return this.findByDataMethod(data);
                
    }

    private horaValida(atendimento:Atendimento) {
        const listDb = this.getAllMethod();
        if( listDb === undefined) {
            return;
        }
       return atendimento.intervalos.map(intervalo => {
            return listDb.map(atendimentoDb => {
                return  atendimentoDb.intervalos.map(intervaloDb => {
                    let inicioDb = moment(intervaloDb.inicio,'HH:mm');
                    let fimDb = moment(intervaloDb.fim,'HH:mm');       
                    return this.moment.range(inicioDb,fimDb).contains(moment(intervalo.inicio,'HH:mm')) || this.moment.range(inicioDb,fimDb).contains(moment(intervalo.fim,'HH:mm'));
                })
                
            });
        }).reduce(reducer => { return reducer})
            .reduce(reducer => { return reducer})
                .reduce(reducer => { return reducer});
                    
    }
}
