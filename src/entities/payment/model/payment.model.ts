export interface Payment {
  id: string;
  recipient: string;
  amount: number;
  currency: 'USD' | 'EUR' | 'GBP';
  status: 'pending' | 'completed' | 'failed';
}
