import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const jwtToken = localStorage.getItem('jwt');

    if (jwtToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + jwtToken)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }

  }
}
