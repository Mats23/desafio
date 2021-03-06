import {Path, GET, POST, DELETE} from 'typescript-rest';
import { Atendimento } from '../models/Atendimento';
import { Intervalo } from "../models/Intervalo";
import { AtendimentoService } from '../service/AtendimentoService';


@Path('/atendimento')
export class AtendimentoController  {
    
    atendimentoService:AtendimentoService = new AtendimentoService();


    @GET
    getAtendimento():Atendimento[] {
        return this.atendimentoService.getAll();

    }

    @POST
    createAtendimento(atendimento:Atendimento):Atendimento | string {
        return this.atendimentoService.createNewAtendimento(atendimento);
    }


    @DELETE
    @Path('remover')
    removeAtendimento(id:string) {
        return this.atendimentoService.remover(id);
    }

    @POST
    @Path('consultar-atendimento')
    searchAtendimentos(intervalo:Intervalo) {
        return this.atendimentoService.getAtendimentoFilter(intervalo); 



    }


}



