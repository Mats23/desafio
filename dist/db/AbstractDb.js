"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
class AbstractDb {
    constructor() {
        this.adapter = new FileSync('./src/db.json');
        this.db = lowdb(this.adapter);
    }
    getMethod(path, data) {
        return this.db.get(path).push(data).write();
    }
    getAllMethod(path) {
        return this.db.get(path);
    }
    findMethod(path, info) {
        return this.db.get(path).find(info).value();
    }
    createMethod(entity, atendimento) {
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
exports.AbstractDb = AbstractDb;
