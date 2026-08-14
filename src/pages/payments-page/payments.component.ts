import {Component, inject} from '@angular/core';
import {PaymentCardComponent} from '../../entities/payment/payment-card/payment-card.component';
import {PaymentService} from '../../entities/payment/model/payment.service';

@Component({
  selector: 'app-payments-page',
  imports: [
    PaymentCardComponent
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss',
})
export class PaymentsComponent {
  private paymentService = inject(PaymentService);

  payments = this.paymentService.getPayments();
  statusFilter = this.paymentService.getStatusFilter();
  currencyFilter = this.paymentService.getCurrencyFilter();

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

}












