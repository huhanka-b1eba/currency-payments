import {ResolveFn} from '@angular/router';
import {Payment} from './payment.model';
import {inject} from '@angular/core';
import {PaymentService} from './payment.service';

export const paymentResolver: ResolveFn<Payment> = route => {
  const paymentService = inject(PaymentService);

  const id = route.paramMap.get('id')

  if (!id) {
    throw new Error('Payment id is missing');
  }

  return paymentService.getPayment(id)
}
