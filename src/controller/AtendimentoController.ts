import {Path, GET, PathParam, POST, FormParam, QueryParam, Param, DELETE} from 'typescript-rest';
import {AbstractDb} from "../db/AbstractDb";
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
    createAtendimento(atendimento:Atendimento):Atendimento | string {
        return this.atendimentoService.createNewAtendimento(atendimento);
    }

    @DELETE
    @Path('remover')
    removeAtendimento(data:string) {
        return this.atendimentoService.remover(data);
    }

    @POST
    @Path('consultar-atendimento')
    consultarAtendimentos(intervalo:Intervalo) {
        
        return this.atendimentoService.getAtendimentoFilter(intervalo); 



    }


}



