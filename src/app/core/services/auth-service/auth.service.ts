import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private TOKEN_KEY = 'id_token';

  static getAccessToken(): string {
    return localStorage.getItem('token');
  }

  setAccessToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

}
