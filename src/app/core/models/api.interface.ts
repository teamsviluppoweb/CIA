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
  codice: string;
  nome: string;
}

export interface ComuniLSt {
  codice: string;
  nome: string;
  codiceProvincia: string;
}

export interface StatoDomandaObject {
  statoDomanda: any;
  inviataInData: any;
  ultimaModifica: any;
  domandaMenuTesto: string;
  displayVisualizzaDomanda: boolean;
}

export interface InfoConcorso {
  nomeConcorso: string;
  titoloConcorso: string;
  dataInizioDomanda: string;
  dataFineDomanda: string;
  dataFineConcorso: string;
}
