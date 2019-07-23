import { TestBed, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));



  it('should be true on valid token regex from cas', inject([AuthGuard], (guard: AuthGuard) => {
    const url = 'http://172.16.26.72:4200/?ticket=JWT-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

    const result = AuthGuard.ispectUrl(url);
    expect(result).toEqual(true);
  }));


  it('should be false on invalid token regex from cas', inject([AuthGuard], (guard: AuthGuard) => {
    const url = 'http://172.16.26.72:4200/?ticket=JWTfdsfdsfsdxx-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

    const result = AuthGuard.ispectUrl(url);
    expect(result).toEqual(false);
  }));


});
