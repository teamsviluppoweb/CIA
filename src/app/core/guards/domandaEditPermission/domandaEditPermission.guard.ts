import {Observable, of} from 'rxjs';
import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
 export class DomandaEditPermissionGuard implements CanActivate {

    url: string;

    constructor(private restApi: ApiService, private router: Router) {
    }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {

        return this.restApi.getDomanda(false,false).pipe(
            map( (x) => {
                if (x['operazione'] === 2) {
                    console.log('====');
                    this.router.navigate(['/domanda/visualizza']);
                    return false;
                } else {
                    return true;
                }
            })
        );

    }



}
