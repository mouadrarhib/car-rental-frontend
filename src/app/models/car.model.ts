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
    categoryName: string;
    pricePerDay: number;
    totalPrice: number;
    imageUrl: string[]; // Array of image URLs
    available: boolean;
  }