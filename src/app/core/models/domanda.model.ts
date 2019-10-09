import {
    AnagCandidatoInterface,
    CorsiAggAmmInterface,
    DomandaInterface, ProtocolloInterface,
    TitoliStudioPossedutiInterface
} from './domanda.interface';
import {Injectable} from "@angular/core";
import {
        QualificheApiLst,
        SediApiLSt,
        TipologiaTitoliDiStudioLSt,
        TitoliDiStudioIndirizzoLSt,
        TitoliDiStudioLSt
} from "./api.interface";
@Injectable({
        providedIn: 'root',
})


export class DomandaModel implements DomandaInterface {
        id: null;
        idDomanda: null;
        versione: number;
        stato: number;
        dataInvio: string;
        anagCandidato: AnagCandidatoModel;
        protocollo: ProtocolloModel;
        titoliStudioPosseduti?: (TitoliStudioPossedutiModel)[] | null;
        corsiAggAmm?: (CorsiAggAmmInterface)[] | null;

        constructor() {
        }
}


export class AnagCandidatoModel implements  AnagCandidatoInterface {
        codiceFiscale: string;
        cognome: string;
        nome: string;
        dataNascita: string;
        comuneNascita: ComuneNascita;
        domicilio: string;
        telefono: string;
        email: string;
        qualificaAttuale: Qualifica;
        sedeAttuale: Sede;
}

export class ComuneNascita {
        codice: string;
        nome: string;
        codiceProvincia: string;
}

export class Qualifica implements  QualificheApiLst {
        id: string;
        desc: string;
}

export class Sede implements  SediApiLSt {
        id: string;
        desc: string;
}

export class TitoliStudioPossedutiModel implements  TitoliStudioPossedutiInterface {
        tipologia: TipologiaModel;
        titolo: TitoloModel;
        indirizzo: IndirizzoModel;
        dataConseguimento: string;
        istituto: string;
        luogoIstituto: LuogoIstitutoModel;
        durataAnni: string;
}

export class LuogoIstitutoModel {
        codice: string;
        nome: string;
        codiceProvincia: string;
}

export class TipologiaModel implements TipologiaTitoliDiStudioLSt {
        id: string;
        desc: string;
}

export class TitoloModel implements TitoliDiStudioLSt {
        id: string;
        desc: string;
}

export class IndirizzoModel implements  TitoliDiStudioIndirizzoLSt {
        id: string;
        desc: string;
}



export class CorsiAggAmmModel implements CorsiAggAmmInterface {
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

export class ProtocolloModel implements ProtocolloInterface {
        id: string;
        numero: string;
        data: string;

}
