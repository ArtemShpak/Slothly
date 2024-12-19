import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from './authentication/log-in/auth.service';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private authenticationService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const username = sessionStorage.getItem('authenticatedUser');
    const password = sessionStorage.getItem('authenticatedPassword');

    if (username && password && req.url.indexOf('basicauth') === -1) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Basic ${window.btoa(username + ":" + password)}`)
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
