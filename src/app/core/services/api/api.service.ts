import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from '..';
import {
  ComuniLSt,
  Corsi,
  CorsiApiLst, Domanda,
  Formazione, ProvinceLSt,
  QualificaSede,
  QualificheApiLst,
  SediApiLSt,
  TipologiaTitoliDiStudioLSt, TitoliDiStudioIndirizzoLSt, TitoliDiStudioLSt
} from '../../models/api.interface';
import {environment} from '../../../../environments/environment.dev';

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

  getListaCorsi(): Observable<any[] | CorsiApiLst> {
    const refresh = false;

    const options = createHttpOptions(refresh);

    return this.http.get<CorsiApiLst>(environment.endpoints.backendLocation + environment.endpoints.corsi).pipe(
        catchError(this.handleError('Get lista corsi', []))
    );
  }

  getListaQualifiche(): Observable<any[] | QualificheApiLst> {
    const refresh = false;

    const options = createHttpOptions(refresh);

    return this.http.get<QualificheApiLst>(environment.endpoints.backendLocation + environment.endpoints.qualifiche).pipe(
        catchError(this.handleError('Get lista qualifiche', []))
    );
  }

  getListaSedi(): Observable<any[] | SediApiLSt> {
    const refresh = false;

    const options = createHttpOptions(refresh);

    return this.http.get<SediApiLSt>(environment.endpoints.backendLocation + environment.endpoints.sedi).pipe(
        catchError(this.handleError('Get lista sedi', []))
    );
  }

  getTipologiaTitoliDiStudio(): Observable<any[] | TipologiaTitoliDiStudioLSt> {
    const refresh = false;

    const options = createHttpOptions(refresh);

    return this.http.get<TipologiaTitoliDiStudioLSt>(environment.endpoints.backendLocation + environment.endpoints.titoliStudioTipologie).pipe(
        catchError(this.handleError('Get lista tipologia di studio', []))
    );
  }

  getTitoli(id: string): Observable<any[] | TitoliDiStudioLSt> {
    const refresh = false;

    const options = createHttpOptions(refresh);

    return this.http.get<TitoliDiStudioLSt>(environment.endpoints.backendLocation + environment.endpoints.titoliStudioTitoli +  id).pipe(
        catchError(this.handleError('Get lista titoli di studio', []))
    );
  }

  getIndirizzoTitoli(id: string): Observable<any[] | HttpResponse<TitoliDiStudioIndirizzoLSt>> {
    const refresh = false;

    const options = createHttpOptions(refresh);

    return this.http.get<TitoliDiStudioIndirizzoLSt>(environment.endpoints.backendLocation + environment.endpoints.titoliStudioIndirizzi +  id,  { observe: 'response' }).pipe(
        catchError(this.handleError('Get lista titoli di studio', []))
    );
  }

  getProvince(): Observable<any[] | ProvinceLSt> {
    const refresh = false;

    const options = createHttpOptions(refresh);

    return this.http.get<ProvinceLSt>(environment.endpoints.backendLocation + environment.endpoints.province, options).pipe(
        catchError(this.handleError('Get lista province', []))
    );
  }

  getComuni(codiceProvincia: string): Observable<any[] | ComuniLSt> {
    const refresh = false;

    const options = createHttpOptions(refresh);

    return this.http.get<ComuniLSt>(environment.endpoints.backendLocation + environment.endpoints.comuni + codiceProvincia, options).pipe(
        catchError(this.handleError('Get lista comuni', []))
    );
  }

  getDomanda(): Observable<any[] | Domanda> {
    const refresh = false;

    const options = createHttpOptions(refresh);

    return this.http.get<Domanda>(environment.endpoints.backendLocation + environment.endpoints.getDommanda, options).pipe(
        catchError(this.handleError('Get domanda', []))
    );
  }

}
