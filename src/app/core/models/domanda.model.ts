import {
    AnagCandidatoInterface,
    CorsiAggAmmInterface,
    DomandaInterface, ProtocolloInterface,
    TitoliStudioPossedutiInterface
} from './domanda.interface';

export class DomandaModel implements DomandaInterface {
    constructor(
        public id: null,
        public idDomanda: null,
        public versione: number,
        public dataInvio: string,
        public anagCandidato: AnagCandidatoModel,
        public protocollo: ProtocolloModel,
        public titoliStudioPosseduti?: (TitoliStudioPossedutiModel)[] | null,
        public corsiAggAmm?: (CorsiAggAmmInterface)[] | null,
    ) {
    }
}


export class AnagCandidatoModel implements  AnagCandidatoInterface {
    constructor(
        public codiceFiscale: string,
        public cognome: string,
        public nome: string,
        public dataNascita: string,
        public codComuneNascita: string,
        public comuneNascita: string,
        public codprovNascita: string,
        public domicilio: string,
        public telefono: string,
        public email: string,
        public codQualifica: string,
        public descQualifica: string,
        public nomeQualifica: string,
        public codSede: string,
        public descSede: string,
        ) {
    }
}

export class TitoliStudioPossedutiModel implements  TitoliStudioPossedutiInterface {
    constructor(
        public idTipologia: number,
        public tipologia: string,
        public idTS: string,
        public descTS: string,
        public idIndirizzoTS: string,
        public indirizzoTS: string,
        public dataConseguimento: string,
        public istituto: string,
        public luogo: string,
        public durataAnni: string,
    ) {
    }
}

export class CorsiAggAmmModel implements CorsiAggAmmInterface {
    constructor(
        public idCorso: string,
        public tipologiaCorso: string,
        public DescCorso: string,
        public Sorgente: string,
        public GiorniCorso: string,
        public OreCorso: string,
        public dataInizio: string,
        public dataFine: string,
        public CodiceCorso: string,
        ) {
    }
}

export class ProtocolloModel implements ProtocolloInterface {
    constructor(
        public id: string,
        public numero: string,
        public data: string,
     ) {
    }
}
