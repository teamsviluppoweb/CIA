import {Observable, of} from 'rxjs';
import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {delay, map, tap} from 'rxjs/operators';
import {DomandaObject} from "../../models";


@Injectable({
  providedIn: 'root'
})
 export class DomandaViewPermissionGuard implements CanActivate {

    url: string;

    constructor(private restApi: ApiService, private router: Router) {
    }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {

        console.log('ok');

        return this.restApi.getDomanda(false, true).pipe(
            map( (x: DomandaObject) => {
                if (x.operazione === 0) {
                    console.log('permissione not ok');
                    this.router.navigate(['/domanda/edit']);
                    console.log(x);
                    return false;
                } else {
                    console.log('permission ok');
                    console.log(x);
                    return true;
                }
            })
        );

    }



}
