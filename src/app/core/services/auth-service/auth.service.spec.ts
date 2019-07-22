import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {

  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });

    authService = TestBed.get(AuthService);


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

    spyOn(localStorage, 'getItem')
          .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
          .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
          .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
          .and.callFake(mockLocalStorage.clear);
  });




  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });


  describe('setAccessToken', () => {
    it('should store the token in localStorage',
        () => {
          authService.setAccessToken('token');
          expect(localStorage.getItem('token')).toEqual('token');
        });
  });
  describe('getAccessToken', () => {
    it('should return stored token from localStorage',
        () => {
          localStorage.setItem('token', 'token');
          expect(AuthService.getAccessToken()).toEqual('token');
        });
  });

});
