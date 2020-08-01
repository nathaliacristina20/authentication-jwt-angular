import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const tokenLocalStorage = localStorage.getItem('token');

    if (tokenLocalStorage){
      const authReq = req.clone({
        setHeaders: {
          Authorization: tokenLocalStorage
        }
      })
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
