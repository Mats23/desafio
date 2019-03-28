import * as lowdb from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import { Atendimento } from '../models/Atendimento';

export class AbstractDb {
    adapter:FileSync = new FileSync('./src/db.json');
    db:lowdb = lowdb(this.adapter);
    constructor() {}

    getAllMethod() {
        return this.db.get('atendimento').value();
    }
      
    getIntervalosMethod(intervalos) {
        return this.db.get('atendimento').filter({intervalos:intervalos}).value();

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

    removeAtendimentoMethod(id) {
        return this.db.get('atendimento').remove(id).write();
    }

    getDiaDisponiveisMethod() {
        return this.db.get('atendimento').value();
    }

}

