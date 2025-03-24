import { Component, OnInit } from '@angular/core';
import { CategoryRequest, CategoryResponse } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { ApiResponse } from '../../models/api-response.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  categories: CategoryResponse[] = []; // Array to store the list of categories
  newCategory: CategoryRequest = { name: '' }; // Object to store new category data
  selectedCategory: CategoryResponse | null = null; // Object to store the selected category for editing

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadAllCategories(); // Fetch all categories when the component initializes
  }

  // Fetch all categories from the backend
  loadAllCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (response: ApiResponse<CategoryResponse[]>) => {
        this.categories = response.data; // Assign the fetched categories to the `categories` array
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      },
    });
  }

  // Create a new category
  createCategory(): void {
    this.categoryService.createCategory(this.newCategory).subscribe({
      next: () => {
        this.loadAllCategories(); // Refresh the category list after creation
        this.newCategory = { name: '' }; // Reset the form
      },
      error: (error) => {
        console.error('Error creating category:', error);
      },
    });
  }

  // Set the selected category for editing
  editCategory(category: CategoryResponse): void {
    this.selectedCategory = { ...category }; // Create a copy of the selected category
  }

  // Update a category
  updateCategory(): void {
    if (this.selectedCategory) {
      const categoryRequest: CategoryRequest = { name: this.selectedCategory.name };
      this.categoryService.updateCategory(this.selectedCategory.id, categoryRequest).subscribe({
        next: () => {
          this.loadAllCategories(); // Refresh the category list after update
          this.selectedCategory = null; // Reset the selected category
        },
        error: (error) => {
          console.error('Error updating category:', error);
        },
      });
    }
  }

  // Delete a category
  deleteCategory(categoryId: number): void {
    this.categoryService.deleteCategory(categoryId).subscribe({
      next: () => {
        this.loadAllCategories(); // Refresh the category list after deletion
      },
      error: (error) => {
        console.error('Error deleting category:', error);
      },
    });
  }
}
