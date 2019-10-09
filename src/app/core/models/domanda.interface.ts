import {
    QualificheApiLst,
    SediApiLSt,
    TipologiaTitoliDiStudioLSt,
    TitoliDiStudioIndirizzoLSt,
    TitoliDiStudioLSt
} from "./api.interface";
import {
    ComuneNascita,
    IndirizzoModel,
    LuogoIstitutoModel,
    Qualifica, Sede,
    TipologiaModel,
    TitoloModel
} from "./domanda.model";

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
    comuneNascita: ComuneNascitaInterface;
    domicilio: string;
    telefono: string;
    email: string;
    qualificaAttuale: Qualifica;
    sedeAttuale: Sede;
}


export interface ComuneNascitaInterface {
    codice: string;
    nome: string;
    codiceProvincia: string;
}

export interface TitoliStudioPossedutiInterface {
    tipologia: TipologiaModel;
    titolo: TitoloModel;
    indirizzo: IndirizzoModel;
    dataConseguimento: string;
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
