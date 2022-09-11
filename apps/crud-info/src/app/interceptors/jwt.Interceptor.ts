import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const tokem = sessionStorage.getItem('token');

    if (tokem) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${tokem}`,
        },
      });
    }
    return next.handle(req);
  }
}
