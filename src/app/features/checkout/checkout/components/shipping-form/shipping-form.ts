import {
  Component,
  inject,
  output
} from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

// import { IShippingInformation } from '../../models/iorder';
import { IShippingInformation } from '../../../../../core/models/iorder';


@Component({
  selector: 'app-shipping-form',

  imports: [
    ReactiveFormsModule
  ],

  templateUrl:
    './shipping-form.html',

  styleUrl:
    './shipping-form.css'
})
export class ShippingForm {

  private fb =
    inject(FormBuilder);


  shippingSubmit =
    output<IShippingInformation>();


  shippingForm =
    this.fb.nonNullable.group({

      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],

      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],

      address: [
        '',
        [
          Validators.required,
          Validators.minLength(5)
        ]
      ],

      city: [
        '',
        [
          Validators.required
        ]
      ],

      governorate: [
        '',
        [
          Validators.required
        ]
      ],

      postalCode: [
        '',
        [
          Validators.required
        ]
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[0-9+\-\s()]{8,20}$/
          )
        ]
      ]

    });


  onSubmit(): void {

    if (
      this.shippingForm.invalid
    ) {

      this.shippingForm.markAllAsTouched();

      return;
    }


    this.shippingSubmit.emit(
      this.shippingForm.getRawValue()
    );

  }
}