import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

console.log("teste")
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
      req: HttpRequest<any>,
      next: HttpHandler
  ): Observable<HttpEvent<any>> {
      const token = sessionStorage.getItem('userData');
      const authObject = JSON.parse(token!);

      if (token) {
          req = req.clone({
              setHeaders: { Authorization: `Bearer ${authObject.token}` },
          });
      }
      return next.handle(req);
  }
}