import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {forkJoin, Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, debounceTime, map, share, tap} from 'rxjs/operators';
import {HandleError, HttpErrorHandler} from '..';
import {
    ComuniLSt,
    CorsiApiLst,
    InfoConcorso,
    ProvinceLSt,
    QualificheApiLst,
    SediApiLSt,
    TipologiaTitoliDiStudioLSt, TitoliDiStudioIndirizzoLSt, TitoliDiStudioLSt
} from '../../models/api.interface';
import {DomandaInterface} from '../../models/domanda.interface';
import {DomandaModel, DomandaObject, InfoConcorsoModel} from '../../models';
import {environment} from '../../../../environments/environment';
import * as moment from 'moment';
import {Cacheable, CacheBuster} from 'ngx-cacheable';

const apiCache$ = new Subject<void>();
const domandaCache$ = new Subject<void>();


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private handleError: HandleError;

  domanda: DomandaModel;
  concorso: InfoConcorsoModel;
  operazione: number;

  private statoDomandaSubject = new Subject<any>();

  constructor(private http: HttpClient, private router: Router, httpErrorHandler: HttpErrorHandler, private d: DomandaModel, private c: InfoConcorsoModel) {
    this.domanda = d;
    this.concorso = c;
    this.handleError = httpErrorHandler.createHandleError('ApiService');
  }

    sendStato(data: DomandaObject) {
        this.statoDomandaSubject.next(data);
    }

    clearStato() {
        this.statoDomandaSubject.next();
    }

    getMessage(): Observable<DomandaObject> {
        return this.statoDomandaSubject.asObservable();
    }



    @Cacheable({
        cacheBusterObserver: apiCache$
    })
    getListaCorsi(): Observable<any[] | CorsiApiLst[]> {
    const refresh = false;

    return this.http.get<CorsiApiLst[]>( environment.endpoints.backendLocation + environment.endpoints.corsi).pipe(
        map(corsi => {
            return corsi
                .map(x => x)
                .sort((a, b) => {
                    return a.desc.length - b.desc.length;
                });
             }),
        catchError(this.handleError('Get lista corsi', []))

    );
  }

  @Cacheable({
      cacheBusterObserver: apiCache$
  })
  getListaQualifiche(): Observable<any[] | QualificheApiLst[]> {

    return this.http.get<QualificheApiLst[]>(environment.endpoints.backendLocation + environment.endpoints.qualifiche).pipe(
        map(qualifiche => {
            return qualifiche
                .map(x => x)
                .sort((a, b) => {
                    return a.desc.length - b.desc.length;
                });
        }),
        catchError(this.handleError('Get lista qualifiche', []))
    );
  }

  @Cacheable({
      cacheBusterObserver: apiCache$
  })
  getListaSedi(): Observable<any[] | SediApiLSt[]> {

    return this.http.get<SediApiLSt[]>(environment.endpoints.backendLocation + environment.endpoints.sedi).pipe(
        map(sedi => {
            return sedi
                .map(x => x)
                .sort((a, b) => {
                    return a.desc.length - b.desc.length;
                });
        }),
        catchError(this.handleError('Get lista sedi', []))
    );
  }


  @Cacheable({
      cacheBusterObserver: apiCache$
  })
  getTipologiaTitoliDiStudio(): Observable<any[] | TipologiaTitoliDiStudioLSt[]> {
    return this.http.get<TipologiaTitoliDiStudioLSt[]>(environment.endpoints.backendLocation + environment.endpoints.tipologieTitoliStudio).pipe(
        map(tipologia => {
            return tipologia
                .map(x => x)
                .sort((a, b) => {
                    return a.desc.length - b.desc.length;
                });
        }),
        catchError(this.handleError('Get lista tipologia di studio', []))
    );
  }


  @Cacheable({
      cacheBusterObserver: apiCache$
  })
  getTitoli(id: string): Observable<any[] | TitoliDiStudioLSt[]> {

      return this.http.get<TitoliDiStudioLSt[]>(environment.endpoints.backendLocation + environment.endpoints.titoliTitoloStudio +  id).pipe(
        map(titoli => {
            return titoli
                .map(x => x)
                .sort((a, b) => {
                    return a.desc.length - b.desc.length;
                });
        }),
        catchError(this.handleError('Get lista titoli di studio', []))
    );
  }


  @Cacheable({
      cacheBusterObserver: apiCache$
  })
  getIndirizzoTitoli(id: string): Observable<any[] | TitoliDiStudioIndirizzoLSt[]> {

    // tslint:disable-next-line:max-line-length
    return this.http.get<TitoliDiStudioIndirizzoLSt[]>(environment.endpoints.backendLocation + environment.endpoints.indirizziTitoliStudio +  id).pipe(
        map(indirizzi => {
            return indirizzi
                .map(x => x)
                .sort((a, b) => {
                    return a.desc.length - b.desc.length;
                });
        }),
        catchError(this.handleError('Get lista titoli di studio', []))
    );
  }


  @Cacheable({
      cacheBusterObserver: apiCache$
  })
  getProvince(): Observable<any[] | ProvinceLSt[]> {

    return this.http.get<ProvinceLSt[]>(environment.endpoints.backendLocation + environment.endpoints.province).pipe(
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


  @Cacheable({
      cacheBusterObserver: apiCache$
  })
  getComuni(codiceProvincia: string): Observable<any[] | ComuniLSt[]> {
    return this.http.get<ComuniLSt[]>(environment.endpoints.backendLocation + environment.endpoints.comuni + codiceProvincia).pipe(
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

  @Cacheable({
    cacheBusterObserver: apiCache$
  })
   getInfoConcorso(): Observable<InfoConcorso> {
        return this.http.get<InfoConcorso>(environment.endpoints.backendLocation + environment.endpoints.info).pipe(
            tap((x: InfoConcorso) => {
                this.concorso = x;
                this.concorso.dataInizioDomanda =  moment(x.dataFineConcorso).locale('it-IT').format('dddd d MMMM YYYY HH:mm');
                this.concorso.dataFineDomanda =  moment(x.dataFineDomanda).locale('it-IT').format('dddd d MMMM YYYY HH:mm');
                this.concorso.dataFineConcorso =  moment(x.dataFineConcorso).locale('it-IT').format('dddd d MMMM YYYY HH:mm');
            }),
            catchError(this.handleError('Get informazione concorso', null))
        );
    }


  @Cacheable({
    cacheBusterObserver: domandaCache$
  })
  getDomanda(): Observable<any[] | DomandaObject | HttpResponse<DomandaObject>> {

    return this.http.get<DomandaObject>(environment.endpoints.backendLocation + environment.endpoints.visualizzaDomanda).pipe(
         tap( (data: DomandaObject) => {
             this.operazione = data.operazione;
             const response = data.domanda;
             this.domanda.id = response.id;
             this.domanda.idDomanda = response.idDomanda;
             this.domanda.versione = response.versione;
             this.domanda.stato = response.stato;
             this.domanda.dataInvio = response.dataInvio;
             this.domanda.anagCandidato = response.anagCandidato;
             this.domanda.titoliStudioPosseduti = response.titoliStudioPosseduti;
             this.domanda.corsiAggAmm = response.corsiAggAmm;


             this.sendStato(data);

         }),
         catchError(this.handleError('Get domanda', []))
    );
  }

  @CacheBuster({
    cacheBusterNotifier: domandaCache$
  })
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
