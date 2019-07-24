import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, first, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEN_KEY = 'token';

  constructor( private router: Router, private http: HttpClient) { }

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
    this.router.navigate(['auth/login']);
  }

  validateJwt(): Observable<any> {
    return this.http.get('/cas', {observe: 'response'}).pipe(
        map( (response) => {
          if (response.status === 200) {
            return true;
          }
        }),
        catchError((err: Response) => {
          if (err.status === 200) {
            return of(true);
          }

          this.logout();
          return of(false);
        }),
        first()
    );
  }

}
