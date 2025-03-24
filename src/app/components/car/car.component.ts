import { Component, OnInit } from '@angular/core';
import { CarResponse, CarRequest } from '../../models/car.model';
import { CategoryResponse } from '../../models/category.model';
import { CarService } from '../../services/car.service';
import { ApiResponse } from '../../models/api-response.model';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car',
  imports: [CommonModule, FormsModule],
  templateUrl: './car.component.html',
  styleUrl: './car.component.css',
})
export class CarComponent implements OnInit {
  cars: CarResponse[] = [];
  categories: CategoryResponse[] = [];
  selectedFile: File | null = null;
  newCar: CarRequest = { brand: '', model: '', pricePerDay: 0, available: true, categoryId: 0 };
  editCar: CarResponse | null = null;

  constructor(private carService: CarService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadAllCars();
    this.loadAllCategories();
  }

  // Fetch all cars
  loadAllCars(): void {
    this.carService.getAllCars().subscribe({
      next: (response: ApiResponse<CarResponse[]>) => {
        this.cars = response.data;
      },
      error: (error) => {
        console.error('Error fetching cars:', error);
      },
    });
  }

  // Fetch all categories
  loadAllCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response: ApiResponse<CategoryResponse[]>) => {
        this.categories = response.data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  // Create a new car
  createCar(): void {
    this.carService.createCar(this.newCar).subscribe({
      next: () => {
        console.log('Car created successfully');
        this.loadAllCars();
        this.resetNewCarForm();
      },
      error: (error) => {
        console.error('Error creating car:', error);
      },
    });
  }

  // Update an existing car
  updateCar(): void {
    if (this.editCar) {
      const updatedCar: CarRequest = {
        brand: this.editCar.brand,
        model: this.editCar.model,
        pricePerDay: this.editCar.pricePerDay,
        available: this.editCar.available,
        categoryId: this.editCar.categoryId, // Use categoryId from editCar
      };

      this.carService.updateCar(this.editCar.id, updatedCar).subscribe({
        next: () => {
          console.log('Car updated successfully');
          this.loadAllCars();
          this.editCar = null;
        },
        error: (error) => {
          console.error('Error updating car:', error);
        },
      });
    }
  }

  // Delete a car
  deleteCar(carId: number): void {
    if (confirm('Are you sure you want to delete this car?')) {
      this.carService.deleteCar(carId).subscribe({
        next: () => {
          console.log('Car deleted successfully');
          this.loadAllCars();
        },
        error: (error) => {
          console.error('Error deleting car:', error);
        },
      });
    }
  }

  // Handle file selection for image upload
  onFileSelected(event: any, carId: number): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.uploadImage(carId, file);
    }
  }

  // Upload the selected image for a car
  uploadImage(carId: number, file: File): void {
    this.carService.uploadCarImage(carId, file).subscribe({
      next: () => {
        console.log('Image uploaded successfully');
        this.loadAllCars();
      },
      error: (error) => {
        console.error('Error uploading image:', error);
      },
    });
  }

  // Reset the new car form
  resetNewCarForm(): void {
    this.newCar = { brand: '', model: '', pricePerDay: 0, available: true, categoryId: 0 };
  }

  // Set the car to be edited
  setEditCar(car: CarResponse): void {
    this.editCar = { ...car };
  }

  // Cancel editing
  cancelEdit(): void {
    this.editCar = null;
  }

    // Helper function to display car availability
    getAvailabilityText(available: boolean): string {
      return available ? 'Available' : 'Not Available';
    }
    
  getFirstImageUrl(car: CarResponse): string | null {
    if (!car.imageUrl || car.imageUrl.length === 0) return null;
    
    // If the URL is already complete (starts with http)
    if (car.imageUrl[0].startsWith('http')) {
      return car.imageUrl[0];
    }
    
    // Otherwise prepend your backend URL
    return `http://localhost:8088${car.imageUrl[0]}`;
  }

  // Add this error handler
  handleImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.style.display = 'none'; // Hide broken images
  }
}