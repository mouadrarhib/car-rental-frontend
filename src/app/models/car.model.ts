export interface CarRequest {
    brand: string;
    model: string;
    categoryId: number;
    pricePerDay: number;
    available: boolean;
  }
  
  export interface CarResponse {
    id: number;
    brand: string;
    model: string;
    categoryId: number;
    categoryName: string;
    pricePerDay: number;
    totalPrice: number;
    imageUrl: string | null; // Change to string (data URL) or null
    available: boolean;
  }