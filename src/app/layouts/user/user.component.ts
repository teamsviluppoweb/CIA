import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {ApiService} from '../../core/services/api/api.service';
import {MatDrawer} from '@angular/material';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth-service/auth.service';
import {DomandaObject} from '../../core/models';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnDestroy {

  @ViewChild('drawer', { static: true }) topbarDrawer: MatDrawer;

  inviataInData;
  ultimaModifica;

  subscriptionStato: Subscription;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
          map(result => result.matches)
      );

  constructor(private restApi: ApiService,
              private authService: AuthService,
              private breakpointObserver: BreakpointObserver,
              private router: Router) {


    this.subscriptionStato = this.restApi.getMessage().subscribe((data: DomandaObject) => {
      if (data) {
        this.inviataInData = data.domanda.dataInvio;
        this.ultimaModifica = data.domanda.dataModifica;
      } else {
        // clear messages when empty message received
        data = null;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptionStato.unsubscribe();
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
