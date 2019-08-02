export interface Formazione {
  tipologia: string;
  titoloDiStudio: string;
  conseguitoPresso: string;
  luogo: string;
  periodoConseguimento: string;
  dataValidazione: string;
}

export interface QualificaSede {
  qualifica: string;
  sede: string;
}

export interface Corsi {
  nomeCorso: string;
  durataCorso: string;
  dataDiConseguimento: string;
  istituto: string;
  luogo: string;
  periodoConseguimento: string;
}

export interface CorsiApiLst {
  id: string;
  desc: string;
}

export interface QualificheApiLst {
  id: string;
  desc: string;
}

export interface SediApiLSt {
  id: string;
  desc: string;
}

export interface TipologiaTitoliDiStudioLSt {
  id: string;
  desc: string;
}

export interface TitoliDiStudioLSt {
  id: string;
  desc: string;
}

export interface TitoliDiStudioIndirizzoLSt {
  id: string;
  desc: string;
}

export interface ProvinceLSt {
  codProvincia: string;
  provincia: string;
}

export interface ComuniLSt {
  codComune: string;
  comune: string;
}

export interface Domanda {
  id?: null;
  idDomanda?: null;
  versione: number;
  stato: number;
  istanzaJSON?: null;
  dataInvio: string;
  dataModifica: string;
  anagCandidato: AnagCandidato;
  titoliStudioPosseduti?: (TitoliStudioPossedutiEntity)[] | null;
  corsiAggAmm?: (CorsiAggAmmEntity)[] | null;
  protocollo?: null;
}
export interface AnagCandidato {
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
  codQualifica: string;
  descQualifica: string;
  nomeQualifica: string;
  codSede: string;
  descSede: string;
}
export interface TitoliStudioPossedutiEntity {
  idTipologia: number;
  tipologia: string;
  idTS: string;
  descTS: string;
  idIndirizzoTS: number;
  indrizzoTS: string;
  dataConseguimento: string;
  istituto: string;
  luogo: string;
  durataAnni: string;
}
export interface CorsiAggAmmEntity {
  idCorso: string;
  tipologiaCorso: string;
  descCorso: string;
  sorgente: string;
  giorniCorso?: number | null;
  oreCorso?: number | null;
  dataInizio?: string | null;
  dataFine?: string | null;
  codiceCorso: string;
}
