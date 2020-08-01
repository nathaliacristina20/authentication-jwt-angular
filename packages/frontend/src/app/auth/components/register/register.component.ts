import { AuthService } from './../../services/auth.service';
import { User } from './../../interfaces/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup = this.formBuilder.group(
    {
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      phone: [''],
      mobilephone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password1: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
    },
    { validator: this.matchingPasswords }
  );

  states = ['SP', 'RJ', 'MG'];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  matchingPasswords(group: FormGroup) {
    if (group) {
      const password1 = group.controls['password1'].value;
      const password2 = group.controls['password2'].value;

      if (password1 === password2) {
        return null;
      }
    }
    return { matching: false };
  }

  onSubmit() {
    const user: User = {
      ...this.formRegister.value,
      password: this.formRegister.value.password1,
    };

    this.authService.register(user).subscribe(
      (user) => {
        this.notify('Successfuly registered. Use your credentials to sign in.');
        this.router.navigateByUrl('/auth/login');
      },
      (err) => {
        console.error(err);
        this.notify(err.error.message);
      }
    );
  }

  notify(message: string) {
    this.snackBar.open(message, 'OK', { duration: 3000 });
  }
}
