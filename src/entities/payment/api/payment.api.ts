import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Payment} from '../model/payment.model';


@Injectable({
  providedIn: 'root'
})
export class PaymentApi {
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = "http://localhost:300/api"

  getPayments() {
    return this.httpClient.get<Payment[]>(`${this.baseUrl}/payments`);
  }

  createPayment(payment: Payment) {
    return this.httpClient.post<Payment>(`${this.baseUrl}/payment`, payment);
  }

  deletePayment(paymentId: string) {
    return this.httpClient.delete(`${this.baseUrl}/payments/${paymentId}`);
  }
}
