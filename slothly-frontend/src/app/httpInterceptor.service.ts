import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AuthService} from './authentication/auth.service';
import {Router} from '@angular/router';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private authenticationService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const username = sessionStorage.getItem('authenticatedUser');
    const password = sessionStorage.getItem('authenticatedPassword');
    const tokenExpiration = sessionStorage.getItem('tokenExpiration');

    if (username && password && tokenExpiration) {
      const isTokenValid = Date.now() < parseInt(tokenExpiration, 10);

      if (!isTokenValid) {
        sessionStorage.clear(); // Очистить токен, если истек срок действия
        console.error('Token expired');
        this.router.navigate(['/login']);
        return next.handle(req); // Можно добавить логику перенаправления на страницу логина
      }

      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Basic ${window.btoa(username + ":" + password)}`)
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }

}
