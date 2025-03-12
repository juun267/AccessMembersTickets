export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  totalTickets: number;
  availableTickets: number;
  price: number;
  isSoldOut: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  event: Event;
  quantity: number;
  totalAmount: number;
  status: string;
} 