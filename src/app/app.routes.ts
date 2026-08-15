import { Routes } from '@angular/router';
import {PaymentsComponent} from '../pages/payments-page/payments.component';
import {CreatePaymentComponent} from '../pages/create-payment/create-payment.component';
import {PaymentDetailsComponent} from '../pages/payment-details/payment-details.component';

export const routes: Routes = [
  {
    path: 'payments',
    component: PaymentsComponent
  },
  {
    path: 'payments/new',
    component: CreatePaymentComponent
  },
  {
    path: 'payments/:id',
    component: PaymentDetailsComponent
  }
];
