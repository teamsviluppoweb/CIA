import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from '../../../../core/services/api/api.service';
import {MatTable} from '@angular/material';
import {Corsi, Formazione} from '../../../../core/models/api.interface';
import {Observable, of} from 'rxjs';
import {TitoliStudioPossedutiInterface} from '../../../../core/models/domanda.interface';


// tslint:disable-next-line:max-line-length
const tabellaHeader = ['anno', 'titolo-di-studio', 'conseguito-presso'];
const corsiHeaderList = ['nomeCorso', 'durataCorso', 'dataDiConseguimento', 'istituto', 'luogo', 'periodoConseguimento'];

@Component({
  selector: 'app-visualizza-domanda',
  templateUrl: './visualizza-domanda.component.html',
  styleUrls: ['./visualizza-domanda.component.scss']
})
export class VisualizzaDomandaComponent implements OnInit {

  form: FormGroup;

  @ViewChild('table', {static: false}) table: MatTable<Formazione>;

  visualizzaCorsi = true;
  visualizzaTitoli = true;

  titoliDiStudioDichiarati = [];
  TitoliDiStudioHeader: string[] = tabellaHeader;

  corsiDichiarati: any[] = [];

  CorsiHeader: string[] = corsiHeaderList;


  constructor(private formBuilder: FormBuilder, private restApi: ApiService) {
    this.visualizzaCorsi = (this.restApi.domanda.corsiAggAmm.length > 0);
    this.visualizzaTitoli = (this.restApi.domanda.titoliStudioPosseduti.length > 0);

    this.form = this.formBuilder.group({
      anagrafica: this.formBuilder.group({
        codiceFiscale: [this.restApi.domanda.anagCandidato.codiceFiscale],
        cognome: [this.restApi.domanda.anagCandidato.cognome],
        nome: [this.restApi.domanda.anagCandidato.nome],
        dataNascita: [this.restApi.domanda.anagCandidato.dataNascita],
        luogo: [(this.restApi.domanda.anagCandidato.comuneNascita.nome + ' (' + this.restApi.domanda.anagCandidato.comuneNascita.codiceProvincia + ')')],
        domicilio: [this.restApi.domanda.anagCandidato.domicilio],
        telefono: [this.restApi.domanda.anagCandidato.telefono],
        email: [this.restApi.domanda.anagCandidato.email],
        qualifica: [this.restApi.domanda.anagCandidato.qualificaAttuale.desc],
        sede: [this.restApi.domanda.anagCandidato.sedeAttuale.desc]
      })
    });

    this.titoliDiStudioDichiarati =  this.restApi.domanda.titoliStudioPosseduti;
    this.corsiDichiarati  = this.restApi.domanda.corsiAggAmm;
}

  ngOnInit() {

  }

}
