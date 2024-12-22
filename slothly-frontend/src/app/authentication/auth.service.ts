import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  USER_NAME_LOCAL_STORAGE_ATTRIBUTE_NAME = 'authenticatedUser';
  USER_PASSWORD_LOCAL_STORAGE_ATTRIBUTE_NAME = 'authenticatedPassword';

  public username!: string;
  public password!: string;

  constructor(private http: HttpClient) {
    const storedUsername = localStorage.getItem(this.USER_NAME_LOCAL_STORAGE_ATTRIBUTE_NAME);
    const storedPassword = localStorage.getItem(this.USER_PASSWORD_LOCAL_STORAGE_ATTRIBUTE_NAME);

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
      }),
      catchError(error => {
        console.error('Authentication error', error);
        return throwError(error);
      })
    );
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password);
  }

  registerSuccessfulLogin(username: string, password: string) {
    localStorage.setItem(this.USER_NAME_LOCAL_STORAGE_ATTRIBUTE_NAME, username); // Добавьте эту строку
    localStorage.setItem(this.USER_PASSWORD_LOCAL_STORAGE_ATTRIBUTE_NAME, password);
    const expirationTime = Date.now() + 3600 * 1000; // Token validity: 1 hour
    localStorage.setItem('tokenExpiration', expirationTime.toString());
  }


  logout() {
    localStorage.removeItem(this.USER_NAME_LOCAL_STORAGE_ATTRIBUTE_NAME);
    localStorage.removeItem(this.USER_PASSWORD_LOCAL_STORAGE_ATTRIBUTE_NAME);
    localStorage.removeItem('tokenExpiration');
    this.username = '';
    this.password = '';
  }

  isUserLoggedIn() {
    const username = localStorage.getItem(this.USER_NAME_LOCAL_STORAGE_ATTRIBUTE_NAME);
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    if (username && tokenExpiration) {
      const isTokenValid = Date.now() < parseInt(tokenExpiration, 10);
      return isTokenValid;
    }
    return false;
  }

  getLoggedInUserName() {
    return localStorage.getItem(this.USER_NAME_LOCAL_STORAGE_ATTRIBUTE_NAME) || '';
  }

  RegisterUser(user: any) {
    return this.http.post("http://localhost:8080/api/v1/register", user, { responseType: 'text' })
      .pipe(
        catchError(error => {
          console.error('Registration error', error);
          return throwError(error);
        })
      );
  }

  getUserProfile() {
    return this.http.get("http://localhost:8080/api/v1/profile");
  }

  updateProfile(profile: any) {
    return this.http.put("http://localhost:8080/api/v1/profile", profile);
  }
}
