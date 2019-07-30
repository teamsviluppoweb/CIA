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
