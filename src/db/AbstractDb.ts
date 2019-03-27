import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { Atendimento } from '../models/Atendimento';

export class AbstractDb {
    adapter:FileSync = new FileSync('./src/db.json');
    db:lowdb = lowdb(this.adapter);
    constructor() {}

    getMethod(path,data) {
        return this.db.get(path).push(data).write();
    }

    getAllMethod() {
        return this.db.get('atendimento').value();
    }
    getAllIntervalosMethod(path) {
        return this.db.get(path).map('intervalos').value();
    }
    getIntervalosMethod(inicio,fim) {
        return this.db.get('atendimento').filter({intervalos:[{inicio:inicio}]}).value();
    }
    getTipoMethod(tipo) {
        return this.db.get('atendimento').filter({tipo:tipo}).value();
    }

    findByDataMethod(info) {
        return this.db.get('atendimento').find({data:info}).value();
    }

    createMethod(entity:string,atendimento:Atendimento):Atendimento {
        if(this.getLength('atendimento') === 0) {
            this.db.defaults({atendimento:[]}).write();
        }
        return this.db.get(entity).push(atendimento).write();

    }

    getLength(entity) {
        return this.db.get(entity).size().value();
    }

    removeAtendimentoMethod(data) {
        return this.db.get('atendimento').remove(data).write();
    }

    getDiaDisponiveisMethod() {
        return this.db.get('atendimento').value();
    }

}

