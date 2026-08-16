import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {Payment} from '../model/payment.model';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-payment-card',
  imports: [
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
