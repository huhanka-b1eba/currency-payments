import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Payment} from '../../entities/payment/model/payment.model';

@Component({
  selector: 'app-payment-details',
  imports: [],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.scss',
})
export class PaymentDetailsComponent{
  private readonly route = inject(ActivatedRoute);
  readonly payment = this.route.snapshot.data['payment'] as Payment;
}
