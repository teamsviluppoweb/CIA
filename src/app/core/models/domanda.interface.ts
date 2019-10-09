import {
    QualificheApiLst,
    SediApiLSt,
    TipologiaTitoliDiStudioLSt,
    TitoliDiStudioIndirizzoLSt,
    TitoliDiStudioLSt
} from "./api.interface";
import {IndirizzoModel, LuogoIstitutoModel, TipologiaModel, TitoloModel} from "./domanda.model";

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
    qualificaAttuale: QualificheApiLst;
    sedeAttuale: SediApiLSt;
}
export interface TitoliStudioPossedutiInterface {
    tipologia: TipologiaModel;
    titolo: TitoloModel;
    indirizzo: IndirizzoModel;
    dataConseguiento: string;
    istituto: string;
    luogoIstituto: LuogoIstitutoInterface;
    durataAnni: string;
}

export interface LuogoIstitutoInterface {
    codice: string;
    nome: string;
    codiceProvincia: string;
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
