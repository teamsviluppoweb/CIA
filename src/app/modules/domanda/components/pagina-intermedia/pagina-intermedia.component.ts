import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../../core/services/api/api.service';
import {DomandaModel, InfoConcorsoModel} from '../../../../core/models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pagina-intermedia',
  templateUrl: './pagina-intermedia.component.html',
  styleUrls: ['./pagina-intermedia.component.scss']
})
export class PaginaIntermediaComponent implements OnInit {

  infoConcorso: InfoConcorsoModel;
  domanda: DomandaModel;
  operazione;

  constructor(private restApi: ApiService,
              private router: Router)  {
    console.log('dioooo');

  }

  ngOnInit() {
    this.infoConcorso = this.restApi.concorso;
    this.domanda = this.restApi.domanda;
    this.operazione = this.restApi.operazione;
  }


  modifica() {
      this.router.navigate(['domanda/edit']);
  }

  visualizza() {
      this.router.navigate(['domanda/visualizza']);
  }
}

