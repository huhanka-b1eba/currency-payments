import {computed, inject, Injectable, signal} from '@angular/core';
import {CreatePaymentDto, Payment} from './payment.model';
import {PaymentApi} from '../api/payment.api';
import {catchError, EMPTY, finalize, map, of, switchMap, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly paymentApi = inject(PaymentApi);

  private readonly _payments = signal<Payment[]>([]);

  // Состояния
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();


  // Фильтрация транзакций
  private readonly _statusFilter = signal<'all' | Payment['status']>('all');
  private readonly _currencyFilter = signal<'all' | Payment['currency']>('all');

  readonly payments = this._payments.asReadonly();
  readonly statusFilter = this._statusFilter.asReadonly();
  readonly currencyFilter = this._currencyFilter.asReadonly();

  loadPayments() {
    this._loading.set(true);
    this._error.set(null);

    this.paymentApi.getPayments()
      .pipe(
        tap(payments => {
          this._payments.set(payments);
        }) ,
        catchError(() => {
          this._error.set('Не удалось загрузить платежи');
          return EMPTY;
        }),
        finalize(() => {
          this._loading.set(false);
        })
      )
      .subscribe();
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

  setPayments(payments: Payment[]) {
    this._payments.set(payments);
  }

  setLoading(loading: boolean) {
    this._loading.set(loading);
  }

  setError(error: string | null) {
    this._error.set(error)
  }

  testRxJs() {
    this.paymentApi.getPayments()
      .pipe(
        tap(payments => {
          console.log(payments);
        }),
        map(payments => {
          return payments
            .filter(payment => payment.status === 'completed')
            .sort((a, b) => b.amount - a.amount);
        }),
        tap(payments => {
          console.log(payments);
        })
      ).subscribe();
  }

  testSwitchMap() {
    of('1', '2', '3')
      .pipe(
        switchMap(id => {
          return this.paymentApi.getPayment(id)
        })
      ).subscribe(payment => {
        console.log(payment);
    });
  }

  testSearch() {
    of('J', 'Jo', 'Joh', 'John')
      .pipe(
        tap(searchText => console.log(searchText)),
        switchMap(searchText => {
          return this.paymentApi.searchPayments(searchText);
        })
      )
      .subscribe(payments => {
        console.log(payments);
      })
  }

  searchPayments(text: string) {
    const query = text.trim();

    if (!query) {
      return this.paymentApi.getPayments();
    }

    return this.paymentApi.searchPayments(query)
  }

  getPayment(paymentId: string) {
    return this.paymentApi.getPayment(paymentId);
  }

  createPayment(dto: CreatePaymentDto) {
    const payment: Payment = {
      id: crypto.randomUUID(),
      ...dto,
      status: 'pending',
    }

    return this.paymentApi.createPayment(payment);
  }
}







