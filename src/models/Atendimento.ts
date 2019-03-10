import {Intervalo} from "./Intervalo";
import {TipoEnum} from "../enum/TipoEnum";

export class Atendimento {
    id:number;
    data:Intervalo;
    tipo:TipoEnum;
    intervalos:Intervalo;
}