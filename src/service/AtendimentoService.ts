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
        return this.getAllMethod('atendimento');
    }



    createNewAtendimentoEspecifico(atendimento:Atendimento):Atendimento | string {
        atendimento.id = this.gerarId();

        if(atendimento.tipo === TipoEnum.especifico && !this.validarData(atendimento.data)) {
                return 'Data invalida'
        }
    
        if(atendimento.tipo === TipoEnum.especifico && this.verificarDisponibilidade(atendimento)!== undefined) { 
            return 'Dia preenchido' 
        }
        if(this.horaValida(atendimento) > 0) {
            return 'Hora Já preenchida';
        }     
        atendimento.data = moment(atendimento.data,'DD-MM-YYYY').format('DD-MM-YYYY');

    

        return this.createMethod('atendimento',atendimento);
     
       
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

    private validarData(data:string):boolean {
        if(moment(data, "DD-MM-YYYY").isBefore(Date.now())) {
            return false ;

        }
        if(moment(data, "DD-MM-YYYY").isValid()) {
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
        const data = moment(atendimento.data,'DD-MM-YYYY').format('DD-MM-YYYY')
        return this.findByDataMethod(data);
                
    }

    private horaValida(atendimento:Atendimento) {
        let result = 0;
        if(atendimento.tipo === TipoEnum.diario) {
            const atendimentoList = this.getAllMethod();
            atendimentoList.map(atendimentodb => {
                atendimento.intervalos.map(hora => {
                    console.dir(atendimentodb.intervalos);
                    result = this.getIntervalosMethod(hora.inicio,hora.fim).length;
                })
            })
        } else if(atendimento.tipo === TipoEnum.semanal) {
            const atendimentoList = this.getTipoMethod(TipoEnum.diario);
            atendimentoList.forEach(hora => {
                result = this.getIntervalosMethod(hora.inicio,hora.fim).length;
            })
        }
        
        return result
        
    }
}
