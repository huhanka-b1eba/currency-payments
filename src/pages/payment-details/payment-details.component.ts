import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Payment} from '../../entities/payment/model/payment.model';
import {filter, map, switchMap} from 'rxjs';
import {PaymentService} from '../../entities/payment/model/payment.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-payment-details',
  imports: [],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.scss',
})
export class PaymentDetailsComponent implements OnInit {
  private activeRoute = inject(ActivatedRoute);
  private paymentService = inject(PaymentService);
  payment = signal<Payment | null>(null);

  ngOnInit() {
    this.activeRoute.paramMap
      .pipe(
        map(params => params.get('id')),
        filter((id): id is string => id !== null),
        switchMap(id =>
          this.paymentService.getPayment(id)
        ),
        takeUntilDestroyed()
      ).subscribe(payment => {
        this.payment.set(payment);
    })
  }

}
