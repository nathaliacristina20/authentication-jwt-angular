import { Product } from './../interfaces/product';
import { Person } from './../interfaces/person';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MainService {

  readonly url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.url}/people`).pipe(
      tap((p) => console.log(p)),
      catchError(this.errorHandler)
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`).pipe(
      tap((p) => console.log(p)),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'server error.');
  }

}
