import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, share} from "rxjs/operators";
import {ApiService} from "../../core/services/api/api.service";
import {MatDrawer} from "@angular/material";
import {Router} from "@angular/router";
import {AuthService} from "../../core/services/auth-service/auth.service";



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent  {

  @ViewChild('drawer', { static: true }) topbarDrawer: MatDrawer;

  statoDomanda;
  menuInfoState = true;
  menuMainInfo = true;
  menuAltroInfo = true;

  utente: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
          map(result => result.matches)
      );

  constructor(private restApi: ApiService,
              private authService: AuthService,
              private breakpointObserver: BreakpointObserver,
              private router: Router) {
    switch (this.restApi.operazioneAttuale) {
      case 0:
        this.statoDomanda = 'Da inviare';
        break;
      case 1:
        this.statoDomanda = 'Inviata (modificabile)';
        break;
      case 2:
        this.statoDomanda = 'Inviata (non modificabile)';
        break;
      default:
        this.statoDomanda = '';
    }

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

  miaDomanda() {
    this.router.navigate(['domanda/visualizza']);
    this.topbarDrawer.toggle();

  }
  modificaDOmanda() {
    this.router.navigate(['domanda/edit']);
    this.topbarDrawer.toggle();
  }

  Logout() {
    this.authService.logout();
  }

  closeDialog() {
    this.topbarDrawer.toggle();
  }

}
