import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PaymentService} from '../../entities/payment/model/payment.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-payment',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-payment.component.html',
  styleUrl: './create-payment.component.scss',
})
export class CreatePaymentComponent {

  private readonly paymentService = inject(PaymentService);
  private readonly router = inject(Router)

  readonly form = new FormGroup({
    recipient: new FormControl('', {
      nonNullable: true,
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

  const dto = this.form.getRawValue()

  this.paymentService.createPayment(dto).subscribe({
    next: () => {
      this.router.navigate(['/payments']);
    },
    error: err => {
      alert(err);
    }
  });

  }

}
