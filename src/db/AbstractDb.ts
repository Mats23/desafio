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

    getAllMethod(path) {
        return this.db.get(path);
    }

    findMethod(path,info) {
        return this.db.get(path).find(info).value();
    }

    createMethod(entity:string,atendimento:Atendimento):Atendimento[] {
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

