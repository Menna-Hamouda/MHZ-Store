import {
  Component,
  inject
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { AuthApiService } from '../../services/auth-api';


@Component({
  selector: 'app-login',

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './login.html',

  styleUrl: './login.css'
})
export class Login {

  private fb = inject(FormBuilder);

  private authApiService =
    inject(AuthApiService);

  private router =
    inject(Router);

  private route =
    inject(ActivatedRoute);


  isLoading = false;

  loginError = '';


  loginForm =
    this.fb.nonNullable.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required
        ]
      ]

    });


  get email() {
    return this.loginForm.controls.email;
  }


  get password() {
    return this.loginForm.controls.password;
  }


  onSubmit(): void {

    this.loginError = '';


    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;
    }


    this.isLoading = true;


    this.authApiService
      .login(
        this.loginForm.getRawValue()
      )
      .subscribe({

        next: () => {

          const returnUrl =
            this.route.snapshot
              .queryParamMap
              .get('returnUrl');


          const safeReturnUrl =
            returnUrl &&
            returnUrl.startsWith('/')
              ? returnUrl
              : '/home';


          this.router.navigateByUrl(
            safeReturnUrl
          );

        },


        error: (error) => {

          this.isLoading = false;


          if (
            error.message ===
            'INVALID_CREDENTIALS'
          ) {

            this.loginError =
              'Email or password is incorrect.';

          } else {

            this.loginError =
              'Something went wrong. Please try again.';

          }

        }

      });
  }
}