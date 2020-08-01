import { User } from './auth/interfaces/user';
import { AuthService } from './auth/services/auth.service';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  authenticated$: Observable<boolean>;
  user$: Observable<User>;

  constructor(
    private authService: AuthService,
    private router: Router
  ){
    this.authenticated$ = this.authService.isAuthenticated();
    this.user$ = this.authService.getUser();
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
