import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, map, tap} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from '..';
import {
  ComuniLSt,
  Corsi,
  CorsiApiLst,
  Formazione, ProvinceLSt,
  QualificaSede,
  QualificheApiLst,
  SediApiLSt,
  TipologiaTitoliDiStudioLSt, TitoliDiStudioIndirizzoLSt, TitoliDiStudioLSt
} from '../../models/api.interface';
import {DomandaInterface} from '../../models/domanda.interface';
import {DomandaModel, DomandaObject} from '../../models';
import {environment} from '../../../../environments/environment';

// To use if we don't want cached application forms response



function createHttpOptions(refresh = true, observe = false) {
  const headerRefresh = refresh ? {'x-refresh': 'true'} : {};
  const headerResponse = observe ? {observe: 'response'} : {};

  const headers = new HttpHeaders(headerRefresh);

  return { headers };
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private handleError: HandleError;

  domanda: DomandaModel;

  constructor(private http: HttpClient, private router: Router, httpErrorHandler: HttpErrorHandler, private d: DomandaModel) {
    this.domanda = d;
    this.handleError = httpErrorHandler.createHandleError('ApiService');
  }


  getListaCorsi(): Observable<any[] | CorsiApiLst> {
    const refresh = false;

    const options = createHttpOptions(refresh);

    return this.http.get<CorsiApiLst>( environment.endpoints.backendLocation + environment.endpoints.corsi, options).pipe(
        catchError(this.handleError('Get lista corsi', []))
    );
  }

  getListaQualifiche(): Observable<any[] | QualificheApiLst> {
    const refresh = false;

    const options = createHttpOptions(refresh);

    return this.http.get<QualificheApiLst>(environment.endpoints.backendLocation + environment.endpoints.qualifiche, options).pipe(
        catchError(this.handleError('Get lista qualifiche', []))
    );
  }

  getListaSedi(): Observable<any[] | SediApiLSt> {
    const refresh = false;

    const options = createHttpOptions(refresh);

    return this.http.get<SediApiLSt>(environment.endpoints.backendLocation + environment.endpoints.sedi, options).pipe(
        catchError(this.handleError('Get lista sedi', []))
    );
  }

  getTipologiaTitoliDiStudio(): Observable<any[] | TipologiaTitoliDiStudioLSt> {
    const refresh = false;

    const options = createHttpOptions(refresh);

    return this.http.get<TipologiaTitoliDiStudioLSt>(environment.endpoints.backendLocation + environment.endpoints.tipologieTitoliStudio, options).pipe(
        tap(
            (x) => {
            }
        ),
        catchError(this.handleError('Get lista tipologia di studio', []))
    );
  }

  getTitoli(id: string): Observable<any[] | TitoliDiStudioLSt> {
    const refresh = false;

    const options = createHttpOptions(refresh);

    return this.http.get<TitoliDiStudioLSt>(environment.endpoints.backendLocation + environment.endpoints.titoliTitoloStudio +  id, options).pipe(
        tap(
            (x) => {
            }
        ),
        catchError(this.handleError('Get lista titoli di studio', []))
    );
  }

  getIndirizzoTitoli(id: string): Observable<any[] | TitoliDiStudioIndirizzoLSt[]> {
    const refresh = false;

    const options = createHttpOptions(refresh);

    // tslint:disable-next-line:max-line-length
    return this.http.get<TitoliDiStudioIndirizzoLSt[]>(environment.endpoints.backendLocation + environment.endpoints.indirizziTitoliStudio +  id,  options).pipe(
        tap(
            (x) => {
            }
        ),
        catchError(this.handleError('Get lista titoli di studio', []))
    );
  }

  getProvince(): Observable<any[] | ProvinceLSt[]> {
    const refresh = false;

    const options = createHttpOptions(refresh);

    return this.http.get<ProvinceLSt[]>(environment.endpoints.backendLocation + environment.endpoints.province, options).pipe(
        map((province: ProvinceLSt[]) => {
            return province
                .map(x => x)
                .sort((a, b) => {
                    return a.nome.length - b.nome.length;
                });
        }),
        catchError(this.handleError('Get lista province', []))
    );
  }

  getComuni(codiceProvincia: string): Observable<any[] | ComuniLSt[]> {
    const refresh = false;

    const options = createHttpOptions(refresh);

    return this.http.get<ComuniLSt[]>(environment.endpoints.backendLocation + environment.endpoints.comuni + codiceProvincia, options).pipe(
        map((comuni: ComuniLSt[]) => {
            return comuni
                .map(x => x)
                .sort((a, b) => {
                    return a.nome.length - b.nome.length;
                });
        }),
        catchError(this.handleError('Get lista comuni', []))
    );
  }

  getDomanda(observe = false, refresh = false): Observable<any[] | DomandaObject | HttpResponse<DomandaObject>> {

    const options = createHttpOptions(refresh, false);


    return this.http.get<DomandaObject>(environment.endpoints.backendLocation + environment.endpoints.visualizzaDomanda, options).pipe(
         tap( (data: DomandaObject) => {
            const response = data.domanda;
            this.domanda.id = response.id;
            this.domanda.idDomanda = response.idDomanda;
            this.domanda.versione = response.versione;
            this.domanda.stato = response.stato;
            this.domanda.dataInvio = response.dataInvio;
            this.domanda.anagCandidato = response.anagCandidato;
            this.domanda.titoliStudioPosseduti = response.titoliStudioPosseduti;
            this.domanda.corsiAggAmm = response.corsiAggAmm;

         }),
         catchError(this.handleError('Get domanda', []))
    );
  }

  salvaDomanda(): Observable<any[] | DomandaInterface> {


    return this.http.post<DomandaInterface>(environment.endpoints.backendLocation + environment.endpoints.salvaDomanda, this.domanda).pipe(
        tap(
            () => {
                console.log('post');
            }
        ),
        catchError(this.handleError('Salva domanda', []))
    );
  }

}
