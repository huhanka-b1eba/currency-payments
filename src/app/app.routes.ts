import { Routes } from '@angular/router';
import {PaymentsComponent} from '../pages/payments-page/payments.component';
import {PaymentDetailsComponent} from '../pages/payment-details/payment-details.component';
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component';
import {authGuard} from '../shared/auth/authGuard';
import {paymentResolver} from '../entities/payment/model/payment.resolver';
import {formGuard} from '../shared/form/form.guard';

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
            canActivate: [authGuard],
            canDeactivate: [formGuard]
          },
          {
            path: ':id',
            component: PaymentDetailsComponent,
            resolve: {
              payment: paymentResolver
            }
          }]
      },
    ]
  },
];
