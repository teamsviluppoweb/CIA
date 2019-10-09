import {QualificheApiLst, SediApiLSt} from "./api.interface";

export interface DomandaInterface {
    id: string;
    idDomanda: string;
    versione: number;
    stato: number;
    dataInvio: string;
    anagCandidato: AnagCandidatoInterface;
    titoliStudioPosseduti?: (TitoliStudioPossedutiInterface)[] | null;
    corsiAggAmm?: (CorsiAggAmmInterface)[] | null;
    protocollo: ProtocolloInterface;
}
export interface AnagCandidatoInterface {
    codiceFiscale: string;
    cognome: string;
    nome: string;
    dataNascita: string;
    codComuneNascita: string;
    comuneNascita: string;
    codprovNascita: string;
    domicilio: string;
    telefono: string;
    email: string;
    qualifica: QualificheApiLst;
    sede: SediApiLSt;
}
export interface TitoliStudioPossedutiInterface {
    idTipologia: number;
    tipologia: string;
    idTS: string;
    descTS: string;
    idIndirizzoTS: string;
    indirizzoTS: string;
    dataConseguimento: string;
    istituto: string;
    luogo: string;
    durataAnni: string;
}
export interface CorsiAggAmmInterface {
    idCorso: string;
    tipologiaCorso: string;
    DescCorso: string;
    Sorgente: string;
    GiorniCorso: string;
    OreCorso: string;
    dataInizio: string;
    dataFine: string;
    CodiceCorso: string;
}
export interface ProtocolloInterface {
    id: string;
    numero: string;
    data: string;
}
