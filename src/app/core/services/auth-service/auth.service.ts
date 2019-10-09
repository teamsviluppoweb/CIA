import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, first, map} from 'rxjs/operators';
import {ApiService} from "../api/api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEN_KEY = 'token';

  constructor( private router: Router, private restApi: ApiService) { }

  getAccessToken(): string {
   return localStorage.getItem('token');
  }

  setAccessToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeAccessToken(): void {
    localStorage.removeItem('token');
  }

  logout(): void {
    this.removeAccessToken();
    this.router.navigate(['/guest/login']);
  }

  validateJwt(): Observable<any> {
    return this.restApi.getDomanda(true).pipe(
        map( (response) => {

            // Se il token è sbagliato ci pensa l'interceptor a fare il logout all'utente
            return true;
        }),
        catchError((err: Response) => {
          return of(false);
        }),
        first()
    );
  }

}

