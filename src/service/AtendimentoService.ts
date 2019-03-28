import {AbstractDb} from "../db/AbstractDb";
import  {Atendimento } from "../models/Atendimento";
import {Intervalo} from "../models/Intervalo";
import * as moment from "moment";
import {TipoEnum} from "../enum/TipoEnum";

export class AtendimentoService extends AbstractDb {

    private atendimentoList: Atendimento[] = [];
    private atendimentoDb: Atendimento;

    private datas:Atendimento[] = [];

    getAll() {
        return this.getAllMethod();
    }

    createNewAtendimento(atendimento:Atendimento):Atendimento | string {
        atendimento.id = this.gerarId();
        if(this.getAll() === undefined || this.getAll().length === 0) {
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
             return atendimento.data !== undefined}).map(atendimento => {
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
        const data = moment(atendimento.data,'DD-MM-YYYY').format('DD-MM-YYYY');
        return this.findByDataMethod(data);
                
    }

    private horaValida(atendimento:Atendimento) {
        const listDb = this.getAllMethod();
        if( listDb === undefined) {
            return;
        }
        const intervaloDb = this.getIntervalosMethod(atendimento.intervalos);
        if(atendimento.data !== undefined) {
            console.dir(this.verificarDisponibilidade(atendimento));
            return this.findByDataMethod(atendimento.data) === undefined?this.verificaIntervalos(atendimento,listDb):true;
        }
        if(intervaloDb.length > 0) {
            return true;
        }
        return this.verificaIntervalos(atendimento,listDb);

}

    private verificaIntervalos(atendimento, listDb) {
        return atendimento.intervalos.map(intervalo => {
            return listDb.map(atendimentoDb => {
                return  atendimentoDb.intervalos.map(intervaloDb => {
                    const inicioDb = moment(intervaloDb.inicio,'HH:mm');
                    const fimDb = moment(intervaloDb.fim,'HH:mm');  
                    const  horaValida = moment(intervalo.inicio,'HH:mm').isSameOrAfter(inicioDb) && moment(intervalo.fim,'HH:mm').isSameOrBefore(fimDb) ;
                    const intervaloValido = moment(intervalo.inicio,'HH:mm').isSameOrBefore(inicioDb) && moment(intervalo.fim,'HH:mm').isBetween(inicioDb,fimDb); 
                    if(horaValida || intervaloValido) {
                        return true;
                    }
                })   
            });
     }).reduce(reducer => { return reducer})[0][0];
    }
}
