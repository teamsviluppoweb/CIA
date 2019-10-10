import {Observable, of} from 'rxjs';
import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
 export class DomandaViewPermissionGuard implements CanActivate {

    url: string;

    constructor(private restApi: ApiService, private router: Router) {
    }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {

        return this.restApi.getDomanda().pipe(
            map( (x) => {
                if (x['operazione'] === 0) {
                    console.log('permissione not ok');
                    this.router.navigate(['/domanda/edit']);
                    return false;
                } else {
                    console.log('permission ok');
                    return true;
                }
            })
        );

    }



}
