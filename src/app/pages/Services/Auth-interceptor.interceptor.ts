import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AhmedInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('userData');
    console.log(token);
    let x=JSON.parse(token)
    console.log(typeof(x));
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${x._accessToken}`),
      });
      console.log(request);
    }
    return next.handle(request);
  }
}
