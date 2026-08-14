import {computed, Injectable, signal} from '@angular/core';
import {Payment} from './payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly _payments = signal<Payment[]>([
    {
      id: '1',
      recipient: 'John Smith',
      amount: 1200,
      currency: 'USD',
      status: 'completed',
    },
    {
      id: '2',
      recipient: 'Anna Müller',
      amount: 850,
      currency: 'EUR',
      status: 'pending',
    },
    {
      id: '3',
      recipient: 'Oliver Brown',
      amount: 2400,
      currency: 'GBP',
      status: 'completed',
    },
    {
      id: '4',
      recipient: 'Emma Wilson',
      amount: 560,
      currency: 'USD',
      status: 'failed',
    },
    {
      id: '5',
      recipient: 'Lukas Schneider',
      amount: 1750,
      currency: 'EUR',
      status: 'pending',
    },
  ]);

  // Фильтрация транзакций
  private readonly _statusFilter = signal<'all' | Payment['status']>('all');
  private readonly _currencyFilter = signal<'all' | Payment['currency']>('all');

  readonly payments = this._payments.asReadonly();
  readonly statusFilter = this._statusFilter.asReadonly();
  readonly currencyFilter = this._currencyFilter.asReadonly();

  getPayments() {
    return this.payments;
  }

  getStatusFilter() {
    return this.statusFilter;
  }

  getCurrencyFilter() {
    return this.currencyFilter;
  }

  filteredPayments = computed(() => {
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
  paymentsCount = computed(
    () => this.filteredPayments().length
  );

  usdAll = computed(() =>
    this.filteredPayments()
      .filter(payment => payment.currency === 'USD')
      .reduce((acc, payment) => acc + payment.amount, 0));

  eurAll = computed(() =>
    this.filteredPayments()
      .filter(payment => payment.currency === 'EUR')
      .reduce((acc, payment) => acc + payment.amount, 0));

  gbpAll = computed(() =>
    this.filteredPayments()
      .filter(payment => payment.currency === 'GBP')
      .reduce((acc, payment) => acc + payment.amount, 0));

  completedCount = computed(() =>
    this.filteredPayments()
      .filter(payment => payment.status === 'completed').length);

  pendingCount = computed(() =>
    this.filteredPayments()
      .filter(payment => payment.status === 'pending').length);

  failedCount = computed(() =>
    this.filteredPayments()
      .filter(payment => payment.status === 'failed').length);

  // Удаление транзакции
  deletePayment (id: string) {
    this._payments.update(payments =>
      payments.filter(payment => payment.id !== id)
    );
  }

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
