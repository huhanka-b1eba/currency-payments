import {Component, computed, DestroyRef, effect, inject, OnInit} from '@angular/core';
import {PaymentService} from '../../entities/payment/model/payment.service';
import {Payment} from '../../entities/payment/model/payment.model';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {catchError, debounce, debounceTime, distinctUntilChanged, finalize, of, switchMap, tap, throwError} from 'rxjs';
import {PaymentCardComponent} from '../../entities/payment/payment-card/payment-card.component';
import {RouterLink} from '@angular/router';
import {takeUntilDestroyed, toObservable} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-payments-page',
  imports: [
    ReactiveFormsModule,
    PaymentCardComponent,
    RouterLink
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss',
})
export class PaymentsComponent implements OnInit  {
  private paymentService = inject(PaymentService);
  private readonly destroyRef = inject(DestroyRef);

  searchControl = new FormControl('', {
    nonNullable: true,
  });


  ngOnInit() {
    this.paymentService.loadPayments();

    this.searchControl.valueChanges
      .pipe(
        tap(() => {
          this.paymentService.setLoading(true)
        }),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(searchText => {
            return this.paymentService.searchPayments(searchText)
              .pipe(
                catchError(() => {
                  this.paymentService.setPayments([])
                  this.paymentService.setError("Failed to load payments");
                  return of([]);
                }),
                finalize(() => {
                  this.paymentService.setLoading(false)
                })
              )
          }
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(payments => {
        this.paymentService.setPayments(payments);
      })
  }

  loading = this.paymentService.loading;
  error = this.paymentService.error;

  statusFilter = this.paymentService.statusFilter;
  currencyFilter = this.paymentService.currencyFilter;

  filteredPayments = this.paymentService.filteredPayments;
  paymentsCount = this.paymentService.paymentsCount;
  usdAll = this.paymentService.usdAll;
  eurAll = this.paymentService.eurAll;
  gbpAll = this.paymentService.gbpAll;
  completedCount = this.paymentService.completedCount;
  pendingCount = this.paymentService.pendingCount;
  failedCount = this.paymentService.failedCount;

  handleDelete(id: string) {
    return this.paymentService.deletePayment(id);
  }

  resetFilters() {
    this.paymentService.resetFilters();
  }

  setStatusFilter(status: 'all' | Payment['status']) {
    this.paymentService.setStatusFilter(status)
  }

  setCurrencyFilter(currency: 'all' | Payment['currency']) {
    this.paymentService.setCurrencyFilter(currency)
  }
  
  }












