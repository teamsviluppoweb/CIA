import { Component, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, share, timestamp} from "rxjs/operators";
import {ApiService} from "../../core/services/api/api.service";
import {MatDrawer} from "@angular/material";
import {Router} from "@angular/router";
import {AuthService} from "../../core/services/auth-service/auth.service";
import * as moment from 'moment';
import {StatoDomandaObject} from "../../core/models/api.interface";
import {InfoConcorsoModel} from "../../core/models";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent  {

  @ViewChild('drawer', { static: true }) topbarDrawer: MatDrawer;

  statoDomanda;
  inviataInData;
  ultimaModifica;

  menuInfoState = true;
  menuMainInfo = true;
  menuAltroInfo = true;

  subscriptionStato: Subscription;
  nomeConcorso;

  utente: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
          map(result => result.matches)
      );

  constructor(private restApi: ApiService,
              private authService: AuthService,
              private breakpointObserver: BreakpointObserver,
              private router: Router) {

    this.nomeConcorso = this.restApi.concorso.nomeConcorso;
    console.log(this.nomeConcorso);


    this.subscriptionStato =  this.restApi.getMessage().subscribe((message: StatoDomandaObject) => {
      if (message) {
        message = message['text'];
        this.inviataInData = moment(message.inviataInData).locale("it-IT").format('dddd d MMMM YYYY HH:mm');
        this.ultimaModifica = moment(message.ultimaModifica).locale("it-IT").format('dddd d MMMM YYYY HH:mm');


        switch (message.statoDomanda as number) {
          case 0:
            this.statoDomanda = 'Da inviare';
            break;
          case 1:
            this.statoDomanda = 'Inviata (modificabile)';
            break;
          case 2:
            this.statoDomanda = 'Inviata (non modificabile concorso scaduto)';
            break;
          default:
            this.statoDomanda = '';
        }

      } else {
        // clear messages when empty message received
        message = null;
      }
    });

    this.utente = ' ' + this.restApi.domanda.anagCandidato.nome + ' ' + this.restApi.domanda.anagCandidato.cognome;
  }

  showPrint() {
    const url = this.router.url;
    if (url === '/domanda/visualizza') {
      return true;
    }
    return false;
  }

  print() {
    this.topbarDrawer.toggle();
    setTimeout(() => {
      (window as any).print();
    }, 400);
  }

  MenuIconState() {
    if (this.topbarDrawer.opened ) {
      return 'close';
    }
    return 'menu';
  }

  CloseNavBar() {
    this.topbarDrawer.toggle();
  }


  Logout() {
    this.authService.logout();
  }

  closeDialog() {
    this.topbarDrawer.toggle();
  }

}
