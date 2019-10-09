import {
    AnagCandidatoInterface,
    CorsiAggAmmInterface,
    DomandaInterface, ProtocolloInterface,
    TitoliStudioPossedutiInterface
} from './domanda.interface';
import {Injectable} from "@angular/core";
import {QualificheApiLst, SediApiLSt} from "./api.interface";
@Injectable({
        providedIn: 'root',
})


export class DomandaModel implements DomandaInterface {
        id: null;
        idDomanda: null;
        versione: number;
        stato: string;
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
        codComuneNascita: string;
        comuneNascita: string;
        codprovNascita: string;
        domicilio: string;
        telefono: string;
        email: string;
        qualifica: Qualifica;
        sede: Sede;
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
