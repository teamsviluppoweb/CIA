import {async, inject, TestBed} from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import {routes} from '../../../modules/domanda/domanda-routing.module';
import {DomandaEditComponent} from '../../../modules/domanda/components';
import {NO_ERRORS_SCHEMA} from '@angular/core';

let authService: AuthService;
let router: Router;
let httpClient: HttpClient;
let httpTestingController: HttpTestingController;

describe('AuthService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
              DomandaEditComponent,
            ],
            imports: [
                RouterTestingModule.withRoutes(routes),
                HttpClientTestingModule,
            ],
            providers: [AuthService],
            schemas: [NO_ERRORS_SCHEMA]

        });

        authService = TestBed.get(AuthService);
        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        router = TestBed.get(Router);
        router.initialNavigation();

        /* Mock version of localStorage, to avoid using real one
          https://medium.com/@armno/til-mocking-localstorage-and-sessionstorage-in-angular-unit-tests-a765abdc9d87

          INFO: Note that .length property and key() method are not implemented.
          I personally never have to use them but there should be some examples online on how to also mock them.
     */
        let store = {};
        const mockLocalStorage = {
            getItem: (key: string): string => {
                return key in store ? store[key] : null;
            },
            setItem: (key: string, value: string) => {
                store[key] = `${value}`;
            },
            removeItem: (key: string) => {
                delete store[key];
            },
            clear: () => {
                store = {};
            }
        };

        spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
        spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
        spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
        spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        const service: AuthService = TestBed.get(AuthService);
        expect(service).toBeTruthy();
    });

    it('should return stored token from localStorage', () => {
        localStorage.setItem('token', 'token');
        expect(authService.getAccessToken()).toEqual('token');
    });

    it('should store the token in localStorage', () => {
        authService.setAccessToken('token');
        expect(localStorage.getItem('token')).toEqual('token');
    });

    it('should return remove the token', () => {
        authService.setAccessToken('token');
        expect(localStorage.getItem('token')).toEqual('token');
        localStorage.removeItem('token');
        expect(authService.getAccessToken()).toEqual(null);
    });


    it(`should emit 'true' for a valid call`, async(inject([AuthService, HttpTestingController],
        (service: AuthService, backend: HttpTestingController) => {
            service.validateJwt().subscribe((next) => {
                expect(next).toBeTruthy();
                expect(next).toEqual(true);
            });

            backend.expectOne('http://webpc.dipvvf.it:6001/GetDomanda').flush([], {status: 200, statusText: 'Authorized'});

    })));


});
