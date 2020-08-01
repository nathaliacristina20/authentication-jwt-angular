import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.formBuider.group({
    'email': ['', [Validators.required, Validators.email]],
    'password': ['', [Validators.required, Validators.minLength(6)]],
  });

  loading = false;

  constructor(
    private formBuider: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const credentials = this.loginForm.value;
    this.loading = true;
    this.authService.login(credentials)
      .subscribe(
        user => {
          this.notify(`Logged in successfuly. Welcome ${user.firstname}!`);
          this.router.navigateByUrl('/');
          this.loading = false;
        },
        err => {
          this.notify(err.message);
          this.loading = false;
        }
      )
  }

  notify(message: string) {
    this.snackBar.open(message, 'OK', { duration: 3000});
  }

}
