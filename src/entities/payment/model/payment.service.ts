import {computed, inject, Injectable, signal} from '@angular/core';
import {Payment} from './payment.model';
import {PaymentApi} from '../api/payment.api';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly paymentApi = inject(PaymentApi);

  private readonly _payments = signal<Payment[]>([]);


  // Фильтрация транзакций
  private readonly _statusFilter = signal<'all' | Payment['status']>('all');
  private readonly _currencyFilter = signal<'all' | Payment['currency']>('all');

  readonly payments = this._payments.asReadonly();
  readonly statusFilter = this._statusFilter.asReadonly();
  readonly currencyFilter = this._currencyFilter.asReadonly();

  loadPayments() {
    this.paymentApi.getPayments().subscribe(payments => {
      this._payments.set(payments);
    })
  }

  deletePayment(paymentId: string) {
    this.paymentApi.deletePayment(paymentId).subscribe(() => {
      this._payments.update(payments =>
        payments.filter(payment => payment.id !== paymentId)
      )
    })
  }


  readonly filteredPayments = computed(() => {
    const status = this._statusFilter();
    const currency = this._currencyFilter();

    return this._payments().filter(payment => {
      const matchesStatus =
        status === 'all' || payment.status === status;

      const matchCurrency =
        currency === 'all' || payment.currency === currency;

      return matchesStatus && matchCurrency;
    });
  });

  // Статистика
  readonly paymentsCount = computed(
    () => this.filteredPayments().length
  );

  readonly usdAll = computed(() =>
    this.filteredPayments()
      .filter(payment => payment.currency === 'USD')
      .reduce((acc, payment) => acc + payment.amount, 0));

  readonly eurAll = computed(() =>
    this.filteredPayments()
      .filter(payment => payment.currency === 'EUR')
      .reduce((acc, payment) => acc + payment.amount, 0));

  readonly gbpAll = computed(() =>
    this.filteredPayments()
      .filter(payment => payment.currency === 'GBP')
      .reduce((acc, payment) => acc + payment.amount, 0));

  readonly completedCount = computed(() =>
    this.filteredPayments()
      .filter(payment => payment.status === 'completed').length);

  readonly pendingCount = computed(() =>
    this.filteredPayments()
      .filter(payment => payment.status === 'pending').length);

  readonly failedCount = computed(() =>
    this.filteredPayments()
      .filter(payment => payment.status === 'failed').length);

  setStatusFilter(status: 'all' | Payment['status']) {
    this._statusFilter.set(status);
  }

  setCurrencyFilter(currency: 'all' | Payment['currency']) {
    this._currencyFilter.set(currency);
  }

  // Откат фильтров
  resetFilters(){
    this._statusFilter.set('all');
    this._currencyFilter.set('all');
  }
}
