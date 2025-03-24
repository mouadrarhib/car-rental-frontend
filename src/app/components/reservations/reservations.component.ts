import { Component, OnInit } from '@angular/core';
import { ReservationRequest, ReservationResponse } from '../../models/reservation.model';
import { ApiResponse } from '../../models/api-response.model';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservations',
  imports: [CommonModule,FormsModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationComponent implements OnInit {
  reservations: ReservationResponse[] = [];
  currentReservation: ReservationRequest = this.emptyReservation();
  editMode = false;
  currentReservationId: number | null = null;
  searchTerm = '';
  isLoading = false;

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.isLoading = true;
    this.reservationService.getAllReservations().subscribe({
      next: (response: ApiResponse<ReservationResponse[]>) => {
        this.reservations = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading reservations:', error);
        this.isLoading = false;
        alert('Failed to load reservations');
      }
    });
  }

  onSubmit(): void {
    if (!this.validateForm()) return;

    if (this.editMode && this.currentReservationId) {
      this.updateReservation();
    } else {
      this.createReservation();
    }
  }

  createReservation(): void {
    this.isLoading = true;
    this.reservationService.createReservation(this.currentReservation).subscribe({
      next: (response: ApiResponse<ReservationResponse>) => {
        this.reservations.push(response.data);
        this.resetForm();
        this.isLoading = false;
        alert('Reservation created successfully!');
      },
      error: (error) => {
        console.error('Error creating reservation:', error);
        this.isLoading = false;
        alert('Failed to create reservation');
      }
    });
  }

  updateReservation(): void {
    if (!this.currentReservationId) return;

    this.isLoading = true;
    this.reservationService.updateReservation(this.currentReservationId, this.currentReservation).subscribe({
      next: (response: ApiResponse<ReservationResponse>) => {
        const index = this.reservations.findIndex(r => r.id === this.currentReservationId);
        if (index !== -1) {
          this.reservations[index] = response.data;
        }
        this.resetForm();
        this.isLoading = false;
        alert('Reservation updated successfully!');
      },
      error: (error) => {
        console.error('Error updating reservation:', error);
        this.isLoading = false;
        alert('Failed to update reservation');
      }
    });
  }

  editReservation(reservation: ReservationResponse): void {
    this.currentReservation = {
      carId: reservation.carId,
      departurePlace: reservation.departurePlace,
      returnPlace: reservation.returnPlace,
      departureDate: reservation.departureDate,
      returnDate: reservation.returnDate,
      customerName: reservation.customerName,
      customerAddress: reservation.customerAddress,
      customerCountry: reservation.customerCountry,
      customerPhone: reservation.customerPhone,
      customerEmail: reservation.customerEmail,
      promoCode: reservation.promoCode || '',
      comment: reservation.comment || ''
    };

    this.currentReservationId = reservation.id;
    this.editMode = true;
    window.scrollTo(0, 0);
  }

  deleteReservation(id: number): void {
    if (confirm('Are you sure you want to delete this reservation?')) {
      this.isLoading = true;
      this.reservationService.deleteReservation(id).subscribe({
        next: () => {
          this.reservations = this.reservations.filter(r => r.id !== id);
          this.isLoading = false;
          alert('Reservation deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting reservation:', error);
          this.isLoading = false;
          alert('Failed to delete reservation');
        }
      });
    }
  }

  resetForm(): void {
    this.currentReservation = this.emptyReservation();
    this.currentReservationId = null;
    this.editMode = false;
  }

  emptyReservation(): ReservationRequest {
    return {
      carId: 0,
      departurePlace: '',
      returnPlace: '',
      departureDate: '',
      returnDate: '',
      customerName: '',
      customerAddress: '',
      customerCountry: '',
      customerPhone: '',
      customerEmail: '',
      promoCode: '',
      comment: ''
    };
  }

  validateForm(): boolean {
    const requiredFields = [
      'carId',
      'departurePlace',
      'returnPlace',
      'departureDate',
      'returnDate',
      'customerName',
      'customerAddress',
      'customerCountry',
      'customerPhone',
      'customerEmail'
    ];

    for (const field of requiredFields) {
      if (!this.currentReservation[field as keyof ReservationRequest]) {
        alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
        return false;
      }
    }

    if (!this.validateEmail(this.currentReservation.customerEmail)) {
      alert('Please enter a valid email address');
      return false;
    }

    return true;
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  searchReservations(): void {
    if (!this.searchTerm) {
      this.loadReservations();
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.reservations = this.reservations.filter(r => 
      r.customerName.toLowerCase().includes(term) ||
      r.customerEmail.toLowerCase().includes(term) ||
      r.carName.toLowerCase().includes(term)
    );
  }
}
