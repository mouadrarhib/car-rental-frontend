import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CarRequest, CarResponse } from '../models/car.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = 'http://localhost:8088/api/v1/cars'; // Base URL for car endpoints

  constructor(private http: HttpClient) {}

  // Create a new car
  createCar(carRequest: CarRequest): Observable<ApiResponse<CarResponse>> {
    return this.http.post<ApiResponse<CarResponse>>(`${this.apiUrl}/add`, carRequest);
  }

  // Get a car by ID
  getCarById(carId: number): Observable<ApiResponse<CarResponse>> {
    return this.http.get<ApiResponse<CarResponse>>(`${this.apiUrl}/${carId}`);
  }

  // Fetch all cars and convert image byte arrays to data URLs
  getAllCars(): Observable<ApiResponse<CarResponse[]>> {
    return this.http.get<ApiResponse<CarResponse[]>>(`${this.apiUrl}/all`).pipe(
      map((response) => {
        // Convert image byte arrays to data URLs
        response.data = response.data.map((car) => ({
          ...car,
          imageUrl: car.imageUrl ? this.byteArrayToDataUrl(car.imageUrl) : null,
        }));
        return response;
      })
    );
  }

    // Helper function to convert byte array to data URL
    private byteArrayToDataUrl(byteArray: string): string {
      return `data:image/jpeg;base64,${byteArray}`;
    }

  // Get cars by category ID
  getCarsByCategory(categoryId: number): Observable<ApiResponse<CarResponse[]>> {
    return this.http.get<ApiResponse<CarResponse[]>>(`${this.apiUrl}/category/${categoryId}`);
  }

  // Update a car
  updateCar(carId: number, carRequest: CarRequest): Observable<ApiResponse<CarResponse>> {
    return this.http.put<ApiResponse<CarResponse>>(`${this.apiUrl}/${carId}`, carRequest);
  }

  // Delete a car
  deleteCar(carId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${carId}`);
  }

  // Get available cars within a date range
  getAvailableCars(startDate: string, endDate: string): Observable<ApiResponse<CarResponse[]>> {
    return this.http.get<ApiResponse<CarResponse[]>>(`${this.apiUrl}/search`, {
      params: { startDate, endDate },
    });
  }

  // Upload a car image
  uploadCarImage(carId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/image/${carId}`, formData, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
      responseType: 'json',
    });
  }
}