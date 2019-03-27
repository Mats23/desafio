import {Intervalo} from "./Intervalo";
import {TipoEnum} from "../enum/TipoEnum";

export class Atendimento {
    id:number;
    data:string;
    dia:DiaDaSemanaEnum[];
    tipo:TipoEnum;
    intervalos:Intervalo[];
}