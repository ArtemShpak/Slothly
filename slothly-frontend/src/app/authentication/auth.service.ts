import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  USER_PASSWORD_SESSION_ATTRIBUTE_NAME = 'authenticatedPassword';

  public username!: string;
  public password!: string;

  constructor(private http: HttpClient) {
    const storedUsername = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    const storedPassword = sessionStorage.getItem(this.USER_PASSWORD_SESSION_ATTRIBUTE_NAME);

    if (storedUsername && storedPassword) {
      this.username = storedUsername;
      this.password = storedPassword;
    }
  }

  authenticationService(username: string, password: string) {
    return this.http.get(`http://localhost:8080/api/v1/basicauth`, {
      headers: { authorization: this.createBasicAuthToken(username, password) }
    }).pipe(
      map(() => {
        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username, password);
      })
    );
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password);
  }

  registerSuccessfulLogin(username: string, password: string) {
    const expirationTime = Date.now() + 3600 * 1000; // Время жизни токена: 1 час
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    sessionStorage.setItem(this.USER_PASSWORD_SESSION_ATTRIBUTE_NAME, password);
    sessionStorage.setItem('tokenExpiration', expirationTime.toString());
  }


  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem(this.USER_PASSWORD_SESSION_ATTRIBUTE_NAME);
    this.username = '';
    this.password = '';
  }

  isUserLoggedIn() {
    return !!sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
  }

  getLoggedInUserName() {
    return sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME) || '';
  }

  RegisterUser(user: any) {
    return this.http.post("http://localhost:8080/api/v1/register", user, { responseType: 'text' });
  }
}