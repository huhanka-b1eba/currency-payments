import {Component, inject, OnInit} from '@angular/core';
import {PaymentService} from '../../entities/payment/model/payment.service';
import {Payment} from '../../entities/payment/model/payment.model';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap, tap} from 'rxjs';
import {PaymentCardComponent} from '../../entities/payment/payment-card/payment-card.component';
import {RouterLink} from '@angular/router';

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

  searchControl = new FormControl('', {
    nonNullable: true,
  });


  ngOnInit() {
    this.paymentService.loadPayments();

    this.searchControl.valueChanges
      .pipe(
        tap(value => console.log('raw:', value)),
        debounceTime(300),
        distinctUntilChanged(),
        tap(value => console.log('search:', value)),
        switchMap(searchText => {
            return this.paymentService.searchPayments(searchText)
          }
        )
      )
      .subscribe(payments => {
        console.log(payments);
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












