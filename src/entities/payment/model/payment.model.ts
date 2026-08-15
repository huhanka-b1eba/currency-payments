export interface Payment {
  id: string;
  recipient: string;
  amount: number;
  currency: 'USD' | 'EUR' | 'GBP';
  status: 'pending' | 'completed' | 'failed';
}

export interface CreatePaymentDto {
  recipient: string;
  amount: number;
  currency: Payment['currency'];
}
