export interface ReservationRequest {
    carId: number;
    departurePlace: string;
    returnPlace: string;
    departureDate: string; // ISO date format
    returnDate: string; // ISO date format
    customerName: string;
    customerAddress: string;
    customerCountry: string;
    customerPhone: string;
    customerEmail: string;
    promoCode?: string; // Optional
    comment?: string; // Optional
  }
  
  export interface ReservationResponse {
    id: number;
    carId: number;
    carName: string;
    departurePlace: string;
    returnPlace: string;
    departureDate: string;
    returnDate: string;
    totalPrice: number;
    customerName: string;
    customerAddress: string;
    customerCountry: string;
    customerPhone: string;
    customerEmail: string;
    promoCode?: string;
    comment?: string;
  }