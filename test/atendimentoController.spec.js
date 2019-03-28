const request = require('http');


const base_url = 'http://localhost:4200/atendimento/';

describe('buscar todos', ()=> {
    describe('GET /', ()=> {
        it('retornar status 200', ()=> {
            request.request(base_url, (error, response, body) =>{
                expect(response.statusCode).toBe(200);
                done();
            
            });
        });
        it('o body deve conter todos os atendimentos', ()=> {
            request.request(base_url, (error, response, body)=> {
                expect(body).toBe(Atendimento)
                done();
            })
        })
    });
});