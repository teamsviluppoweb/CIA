import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from "..";
import {Corsi, CorsiApi, Formazione, QualificaSede} from "../../models/api.interface";
import {environment} from "../../../../environments/environment.dev";

// To use if we don't want cached application forms response
/*
const httpOptions = {
  headers: new HttpHeaders({
    'x-refresh':  'true'
  })
};
*/

function createHttpOptions(refresh = false) {
  const headerMap = refresh ? {'x-refresh': 'true'} : {};
  const headers = new HttpHeaders(headerMap) ;
  return { headers };
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private handleError: HandleError;

  constructor(private http: HttpClient, private router: Router, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ApiService');
  }


  getFormazione(): Observable<any[] | Formazione[]> {

    const refresh = false;

    const options = createHttpOptions(refresh);

    return this.http.get<Formazione[]>(environment.apicall['titoli-formazione'], options).pipe(
      catchError(this.handleError('Formazione', []))
    );
  }

  getCorsi(): Observable<any[] | Corsi[]> {

    const refresh = false;

    const options = createHttpOptions(refresh);

    return this.http.get<Corsi[]>(environment.apicall['corsi-formazione'], options).pipe(
      catchError(this.handleError('Corsi formazione', []))
    );
  }
  getQualificaSede(): Observable<any[] | QualificaSede> {
    const refresh = false;

    const options = createHttpOptions(refresh);

    return this.http.get<QualificaSede>(environment.apicall['qualifica-sede'], options).pipe(
      catchError(this.handleError('Formazione', []))
    );
  }

  getListaCorsi(): Observable<any[] | CorsiApi> {
    const refresh = false;

    const options = createHttpOptions(refresh);

    return this.http.get<CorsiApi>(environment.endpoints.backendLocation + environment.endpoints.corsi).pipe(
        catchError(this.handleError('Get lista corsi', []))
    );
  }

}
