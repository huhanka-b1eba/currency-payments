import {Component, input, output} from '@angular/core';
import {Payment} from '../model/payment.model';

@Component({
  selector: 'app-payment-card',
  imports: [],
  templateUrl: './payment-card.component.html',
  styleUrl: './payment-card.component.scss',
})
export class PaymentCardComponent {
  payment = input.required<Payment>();

  deleted = output<string>();

  deletePayment() {
    this.deleted.emit(this.payment().id)
  }
}
