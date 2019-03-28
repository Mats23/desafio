import {Path, GET, POST, DELETE} from 'typescript-rest';
import { Atendimento } from '../models/Atendimento';
import { Intervalo } from "../models/Intervalo";
import { AtendimentoService } from '../service/AtendimentoService';


@Path('/atendimento')
export class AtendimentoController  {
    
    atendimentoService:AtendimentoService = new AtendimentoService();


    @GET
    getAtendimento() {
        return this.atendimentoService.getAll();

    }

    @POST
    createAtendimentoEspecifico(atendimento:Atendimento):Atendimento | string {
        return this.atendimentoService.createNewAtendimentoEspecifico(atendimento);
    }


    @DELETE
    @Path('remover')
    removeAtendimento(data:string) {
        return this.atendimentoService.remover(data);
    }

    @POST
    @Path('consultar-atendimento')
    searchAtendimentos(intervalo:Intervalo) {
        
        return this.atendimentoService.getAtendimentoFilter(intervalo); 



    }


}



