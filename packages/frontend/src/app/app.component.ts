import { User } from './auth/interfaces/user';
import { AuthService } from './auth/services/auth.service';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  authenticated$: Observable<boolean>;
  user$: Observable<User>;

  constructor(
    private authService: AuthService
  ){
    this.authenticated$ = this.authService.isAuthenticated();
    this.user$ = this.authService.getUser();
  }
}
