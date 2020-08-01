import { Observable } from 'rxjs';
import { User } from './../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly url ="http://localhost:3000/auth"

  constructor(
    private http: HttpClient
  ) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, user);
  }

  login(credentials: { email: string, password: string}): Observable<User>{
    return this.http.post<User>(`${this.url}/login`, credentials);
  }
}
