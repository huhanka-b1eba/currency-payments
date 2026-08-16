import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Payment} from '../model/payment.model';
import {API_URL} from '../../../shared/config/api-url.token';


@Injectable({
  providedIn: 'root'
})
export class PaymentApi {
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = inject(API_URL)

  getPayments() {
    return this.httpClient.get<Payment[]>(`${this.baseUrl}/payments`);
  }

  createPayment(payment: Payment) {
    return this.httpClient.post<Payment>(`${this.baseUrl}/payments`, payment);
  }

  deletePayment(paymentId: string) {
    return this.httpClient.delete(`${this.baseUrl}/payments/${paymentId}`);
  }

  getPayment(paymentId: string) {
    return this.httpClient.get<Payment>(`${this.baseUrl}/payments/${paymentId}`);
  }

  searchPayments(query: string) {
    const recipient = query.trim();

    return this.httpClient.get<Payment[]>(`${this.baseUrl}/payments`, {
      params: recipient ? {'recipient:contains': recipient} : {},
    });
  }
}
