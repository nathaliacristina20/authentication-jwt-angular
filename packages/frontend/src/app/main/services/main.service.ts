import { Product } from './../interfaces/product';
import { Person } from './../interfaces/person';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MainService {

  readonly url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.url}/people`).pipe(
      catchError((error) => of(error))
    );
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`).pipe(
      catchError((error) => of(error))
    );
  }

}
