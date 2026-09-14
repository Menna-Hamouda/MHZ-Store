import {
  Component,
  inject
} from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import { AuthApiService } from '../../services/auth-api';


const passwordMatchValidator: ValidatorFn =
  (control: AbstractControl):
    ValidationErrors | null => {

      const password =
        control.get('password')?.value;

      const confirmPassword =
        control.get('confirmPassword')?.value;


      if (
        password &&
        confirmPassword &&
        password !== confirmPassword
      ) {

        return {
          passwordMismatch: true
        };

      }


      return null;
    };


@Component({
  selector: 'app-register',

  imports: [
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './register.html',

  styleUrl: './register.css'
})
export class Register {

  private fb = inject(FormBuilder);

  private authApiService =
    inject(AuthApiService);

  private router =
    inject(Router);


  isLoading = false;

  registerError = '';


  registerForm =
    this.fb.nonNullable.group(

      {

        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],

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
            Validators.required,
            Validators.minLength(6)
          ]
        ],

        confirmPassword: [
          '',
          [
            Validators.required
          ]
        ]

      },

      {
        validators: passwordMatchValidator
      }

    );


  get name() {
    return this.registerForm.controls.name;
  }


  get email() {
    return this.registerForm.controls.email;
  }


  get password() {
    return this.registerForm.controls.password;
  }


  get confirmPassword() {
    return this.registerForm.controls.confirmPassword;
  }


  onSubmit(): void {

    this.registerError = '';


    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      return;
    }


    this.isLoading = true;


    const {
      name,
      email,
      password
    } = this.registerForm.getRawValue();


    this.authApiService
      .register({
        name,
        email,
        password
      })
      .subscribe({

        next: () => {

          this.router.navigate(
            ['/login'],
            {
              queryParams: {
                registered: 'true'
              }
            }
          );

        },


        error: (error) => {

          this.isLoading = false;


          if (
            error.message ===
            'EMAIL_EXISTS'
          ) {

            this.registerError =
              'This email is already registered.';

          } else {

            this.registerError =
              'Something went wrong. Please try again.';

          }

        }

      });
  }
}