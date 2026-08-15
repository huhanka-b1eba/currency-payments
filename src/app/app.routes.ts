import { Routes } from '@angular/router';
import {PaymentsComponent} from '../pages/payments-page/payments.component';
import {PaymentDetailsComponent} from '../pages/payment-details/payment-details.component';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'payments',
        pathMatch: 'full'
      },
      {
        path: 'payments',
        children: [
          {
            path: '',
            component: PaymentsComponent
          },
          {
            path: 'new',
            loadComponent: () =>
              import('../pages/create-payment/create-payment.component')
                .then(m => m.CreatePaymentComponent),
          },
          {
            path: ':id',
            component: PaymentDetailsComponent
          }]
      },
    ]
  },
];
