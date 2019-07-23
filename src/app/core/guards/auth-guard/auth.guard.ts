import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    url: string;

    constructor() {
        this.url = window.location.href;
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return true;
    }


    ispectUrl(url: string): boolean {
        const myRegexp = new RegExp('[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$');

        return myRegexp.test(url);
    }

    refactorUrl(url: string): string {
        let token: string;

        token = url.split('?ticket=JWT-').pop();

        return token;
    }

}
