import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from '../../../../core/services/api/api.service';
import {MatTable} from '@angular/material';
import {Corsi, Formazione, StatoDomandaObject} from '../../../../core/models/api.interface';
import {Observable, of} from 'rxjs';
import {TitoliStudioPossedutiInterface} from '../../../../core/models/domanda.interface';
import {DomandaObject} from '../../../../core/models';


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
        codiceFiscale: [],
        cognome: [],
        nome: [],
        dataNascita: [],
        luogo: [],
        domicilio: [],
        telefono: [],
        email: [],
        qualifica: [],
        sede: []
      })
    });

    this.titoliDiStudioDichiarati =  this.restApi.domanda.titoliStudioPosseduti;
    this.corsiDichiarati  = this.restApi.domanda.corsiAggAmm;

    this.restApi.getDomanda(false, true).subscribe(
        (x: DomandaObject) => {
          this.anagrafica().patchValue({
            codiceFiscale: [x.domanda.anagCandidato.codiceFiscale],
            cognome: [x.domanda.anagCandidato.cognome],
            nome: [x.domanda.anagCandidato.nome],
            dataNascita: [x.domanda.anagCandidato.dataNascita],
            luogo: [(x.domanda.anagCandidato.comuneNascita.nome + ' (' + x.domanda.anagCandidato.comuneNascita.codiceProvincia + ')')],
            domicilio: [x.domanda.anagCandidato.domicilio],
            telefono: [x.domanda.anagCandidato.telefono],
            email: [x.domanda.anagCandidato.email],
            qualifica: [x.domanda.anagCandidato.qualificaAttuale.desc],
            sede: [x.domanda.anagCandidato.sedeAttuale.desc]
          });
        }
    );

  }

  ngOnInit() {

  }

  anagrafica() {
    return this.form.get('anagrafica');
  }

}
