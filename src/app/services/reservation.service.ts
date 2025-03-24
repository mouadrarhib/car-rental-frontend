// services/reservation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationRequest, ReservationResponse } from '../models/reservation.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8088/api/v1/reservations'; // Matching your pattern

  constructor(private http: HttpClient) { }

  // Create a new reservation
  createReservation(reservationRequest: ReservationRequest): Observable<ApiResponse<ReservationResponse>> {
    return this.http.post<ApiResponse<ReservationResponse>>(`${this.apiUrl}/add`, reservationRequest);
  }

  // Get a reservation by ID
  getReservationById(reservationId: number): Observable<ApiResponse<ReservationResponse>> {
    return this.http.get<ApiResponse<ReservationResponse>>(`${this.apiUrl}/${reservationId}`);
  }

  // Get all reservations
  getAllReservations(): Observable<ApiResponse<ReservationResponse[]>> {
    return this.http.get<ApiResponse<ReservationResponse[]>>(`${this.apiUrl}/all`);
  }

  // Update a reservation
  updateReservation(reservationId: number, reservationRequest: ReservationRequest): Observable<ApiResponse<ReservationResponse>> {
    return this.http.put<ApiResponse<ReservationResponse>>(`${this.apiUrl}/${reservationId}`, reservationRequest);
  }

  // Delete a reservation
  deleteReservation(reservationId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${reservationId}`);
  }
}