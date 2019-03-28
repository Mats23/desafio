import { AtendimentoController } from './../src/controller/AtendimentoController';
import { Atendimento } from '../src/models/Atendimento';
import { TipoEnum } from '../src/enum/TipoEnum';
import { Intervalo } from '../src/models/Intervalo';

const atendimentoController = new AtendimentoController();  
const atendimento = new Atendimento();

describe('stack', ()=> {
    describe('GET /', ()=> {
        it('retornar todos os atendimentos', ()=> {
            atendimentoController.getAtendimento();
    
        });
    });
    describe('POST /', () => {
        it('cadastrar um antedimento especifico', ()=> {
            atendimento.data = "28-04-2019";
            atendimento.tipo = TipoEnum.especifico;
            atendimento.intervalos = [];
            atendimento.intervalos.push( {
                "inicio": "09:30",
                "fim": "11:00"
        });
            atendimentoController.createAtendimento(atendimento);
        });
    });
    describe('POST /', () => {
        it('cadastrar um antedimento diario', ()=> {
            atendimento.tipo = TipoEnum.diario;
            atendimento.intervalos = [];
            atendimento.intervalos.push( {
                "inicio": "10:30",
                "fim": "12:00"
        });
            atendimentoController.createAtendimento(atendimento);
        });
    });

    describe('POST /', () => {
        it('cadastrar um antedimento semanal', ()=> {
            atendimento.tipo = TipoEnum.semanal;
            atendimento.dia  = [];
            atendimento.dia.push("segunda");
            atendimento.intervalos = [];
            atendimento.intervalos.push( {
                "inicio": "13:30",
                "fim": "14:00"
        });
            atendimentoController.createAtendimento(atendimento);
        });
    });

    describe('DELETE /', () => {
        it('deletar um antedimento', ()=> {
            
            atendimentoController.removeAtendimento("1");
        });
    });


    describe('POST /', () => {
        it('buscar por periodo', ()=> {
            const intervalo = new Intervalo();
            intervalo.inicio = "27-04-2019";
            intervalo.fim = "29-04-2019";
            atendimentoController.searchAtendimentos(intervalo);
        });
    });
    
});