import {Component, computed, signal} from '@angular/core';
import {PaymentCardComponent} from '../../entities/payment/payment-card/payment-card.component';
import {Payment} from '../../entities/payment/model/payment.model';

@Component({
  selector: 'app-payments-page',
  imports: [
    PaymentCardComponent
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss',
})
export class PaymentsComponent {
  payments = signal<Payment[]>([
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
  statusFilter = signal<'all' | Payment['status']>('all');
  currencyFilter = signal<'all' | Payment['currency']>('all');

  filteredPayments = computed(() => {
    const status = this.statusFilter();
    const currency = this.currencyFilter();

    return this.payments().filter(payment => {
      const matchesStatus =
        status === 'all' || payment.status === status;

      const matchCurrency =
        currency === 'all' || payment.currency === currency;

      return matchesStatus && matchCurrency;
    });
  });

  // Удаление транзакции
  handleDelete = (id: string) => {
    this.payments.update(payments =>
      payments.filter(payment => payment.id !== id)
    );
  }

}
