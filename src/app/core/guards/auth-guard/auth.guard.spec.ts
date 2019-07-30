import {TestBed, inject, fakeAsync, async} from '@angular/core/testing';
import {HttpClient, HttpResponse, HttpResponseBase} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { AuthGuard } from './auth.guard';
import {AuthService} from '../../services';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {routes} from '../../../modules/domanda/domanda-routing.module';
import {DomandaEditComponent} from '../../../modules/domanda/components/domanda-edit/domanda-edit.component';
import {NO_ERRORS_SCHEMA} from "@angular/core";


let httpClient: HttpClient;
let httpTestingController: HttpTestingController;
let router: Router;
let authService: AuthService;

describe('AuthGuard', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
          DomandaEditComponent
      ],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(routes)],
      providers: [
          AuthGuard,
        AuthService,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
    router.initialNavigation();

  });


  afterEach(() => {
    httpTestingController.verify();
  });





  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));


  it('should be true on valid token regex from cas', inject([AuthGuard], (guard: AuthGuard) => {
    // tslint:disable-next-line:max-line-length
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const url = 'http://172.16.26.72:4200/?ticket=JWT-' + token;

    const result = guard.ispectUrl(url);
    expect(result).toEqual(true);
  }));


  it('should be false on invalid token regex from cas', inject([AuthGuard], (guard: AuthGuard) => {
    const url = 'http://172.16.26.72:4200/?ticket=JWTfdsfdsfsdxx-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

    const result = guard.ispectUrl(url);
    expect(result).toEqual(false);
  }));

  it('should extract the token from url', inject([AuthGuard], (guard: AuthGuard) => {
    // tslint:disable-next-line:max-line-length
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const url = 'http://172.16.26.72:4200/?ticket=JWT-' + token;

    const result = guard.refactorUrl(url);
    expect(result).toEqual(token);
  }));


});
