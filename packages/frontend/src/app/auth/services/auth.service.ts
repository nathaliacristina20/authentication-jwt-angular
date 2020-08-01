import { tap, map, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from './../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly url = 'http://localhost:3000/auth';
  private subjUser$: BehaviorSubject<User> = new BehaviorSubject(null);
  private subjLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, user);
  }

  login(credentials: { email: string; password: string }): Observable<User> {
    return this.http.post<User>(`${this.url}/login`, credentials).pipe(
      tap((user: User) => {
        localStorage.setItem('token', user.token);
        this.subjLoggedIn$.next(true);
        this.subjUser$.next(user);
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (token && !this.subjLoggedIn$.value) {
      return this.checkTokenValidation();
    }
    return this.subjLoggedIn$.asObservable();
  }

  checkTokenValidation(): Observable<boolean> {
    return this.http.get<User>(`${this.url}/user`).pipe(
      tap((user: User) => {
        if (user) {
          this.subjLoggedIn$.next(true);
          this.subjUser$.next(user);
        }
      }),
      map((user: User) => !!user),
      catchError((error) => {
        this.logout();
        return of(false);
      })
    );
  }

  getUser(): Observable<User> {
    return this.subjUser$.asObservable();
  }

  logout() {
    localStorage.removeItem('token');
    this.subjLoggedIn$.next(false);
    this.subjUser$.next(null);
  }
}
