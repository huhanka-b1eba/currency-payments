import {Component, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {switchMap, tap} from 'rxjs';

@Component({
  selector: 'app-create-payment',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-payment.component.html',
  styleUrl: './create-payment.component.scss',
})
export class CreatePaymentComponent {

  form = new FormGroup({
    recipient: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(2),
      ],
    }),

    amount: new FormControl(0, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(1),
      ]
    }),

    currency: new FormControl<'USD' | 'EUR' | 'GBP'>('USD', {
      nonNullable: true,
      validators: [Validators.required]
    })
  })

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log(this.form.getRawValue());
  }

}
