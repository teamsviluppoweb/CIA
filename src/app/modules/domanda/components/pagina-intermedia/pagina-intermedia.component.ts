import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../../core/services/api/api.service';
import {DomandaObject, InfoConcorsoModel} from '../../../../core/models';
import {Router} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-pagina-intermedia',
  templateUrl: './pagina-intermedia.component.html',
  styleUrls: ['./pagina-intermedia.component.scss']
})
export class PaginaIntermediaComponent implements OnInit {

  nomeCognomeCandidato;
  dataInvio;
  utlimaModifica;
  statoDomanda;

  infoConcorso: InfoConcorsoModel;

  constructor(private restApi: ApiService,
              private router: Router)  {
    this.restApi.getDomanda(false, false).subscribe(
        (x: DomandaObject) => {
          this.nomeCognomeCandidato = x.domanda.anagCandidato.cognome + ' ' + x.domanda.anagCandidato.nome;
          this.dataInvio = moment(x.domanda.dataInvio).locale('it-IT').format('dddd d MMMM YYYY HH:mm');
          this.utlimaModifica = moment(x.domanda.dataModifica).locale('it-IT').format('dddd d MMMM YYYY HH:mm');

          if (this.restApi.operazioneAttuale === 1) {
            this.statoDomanda = 'Inviata (modificabile)';
          }
          if (this.restApi.operazioneAttuale === 2) {
            this.statoDomanda = 'inviata (non modificabile)';
          }

        }
    );

    this.infoConcorso = this.restApi.concorso;

    this.infoConcorso.dataFineConcorso = moment(this.infoConcorso.dataFineConcorso).locale('it-IT').format('dddd d MMMM YYYY HH:mm');
    this.infoConcorso.dataFineDomanda = moment(this.infoConcorso.dataFineDomanda).locale('it-IT').format('dddd d MMMM YYYY HH:mm');
    this.infoConcorso.dataInizioDomanda = moment(this.infoConcorso.dataInizioDomanda).locale('it-IT').format('dddd d MMMM YYYY HH:mm');
  }

  ngOnInit() {
  }


  modifica() {
      this.router.navigate(['domanda/edit']);
  }

  visualizza() {
      this.router.navigate(['domanda/visualizza']);
  }
}

