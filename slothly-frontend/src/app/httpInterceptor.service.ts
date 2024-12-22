import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './authentication/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const username = localStorage.getItem('authenticatedUser');
    const password = localStorage.getItem('authenticatedPassword');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    if (username && password && tokenExpiration) {
      const isTokenValid = Date.now() < parseInt(tokenExpiration, 10);

      if (!isTokenValid) {
        localStorage.clear(); // Clear token if expired
        console.error('Token expired');
        this.router.navigate(['/login']);
        return next.handle(req); // Optionally redirect to login page
      }

      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Basic ${window.btoa(username + ":" + password)}`)
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
