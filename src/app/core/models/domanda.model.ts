export class Domanda {
    constructor(
        public id: number,
        public version: number,
        public idDomanda: number,
        public statoDomanda: string,
        public dataInvio: Date = new Date(),
        public dataModifica: Date = new Date(),
        public anagrafica: Anagrafica,
        public titoloDiSutdioPosseduti: TitoliDiStudioPosseduti[],
        public master: Master[],
        public abilitazione: Abilitazione,
        public corsiAggAmm: CorsiAggAmm[],
        public protocollo: Protocollo
    ){
    }
}

export class Anagrafica {
    constructor(
        public codiceFiscale: string,
        public cognome: string,
        public nome: string,
        public dataNascita: Date = new Date(), // TODO: Vedere se esiste un metodo migliore
        public codComuneNascita: number,
        public comuneNascita: string,
        public codProvNascita: number,
        public domicilio: string,
        public telefono: string,
        public email: string,
        public codQualifica: string,
        public descQualifica: string,
        public nomeQualifica: string,
        public codSede: string,
        public descSede: string
    ) {

    }
}

export class TitoliDiStudioPosseduti {
    constructor(
        public descTittoloStudio: string,
        public dataConseguimento: Date = new Date(),
        public presso: string,
    ) {

    }
}

export class Master {
    constructor(
        public tipoMaster: string,
        public durata: string,
        public dataInizio: Date = new Date(),
        public dataFine: Date = new Date,
        public press: string,
        public titoloRilasciato: string,
        public dataRilascio: Date = new Date()
    ) {
    }
}

export class Abilitazione {
    constructor(
        public titolo: string,
        public annoAbilitazione: Date = new Date()
    ) {

    }
}

export class CorsiAggAmm {
    constructor(
        public idCorso: string,
        public tipologiaCorso: string,
        public descCorso: string,
        public sorgente: string,
        public giorniCorso: string,
        public oreCorso: string,
        public dataInizio: string,
        public dataFine: string,
        public codiceCorso: string,
    ) {
    }
}

export class Protocollo {
    constructor(
        public id: number,
        public numero: number,
        public data: Date = new Date()
    ) {
    }
}



