import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CategoryRequest, CategoryResponse } from '../models/category.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:8088/api/v1/categories'; // Base URL for category endpoints

  constructor(private http: HttpClient) {}

  // Create a new category
  createCategory(categoryRequest: CategoryRequest): Observable<ApiResponse<CategoryResponse>> {
    return this.http.post<ApiResponse<CategoryResponse>>(`${this.apiUrl}/add`, categoryRequest);
  }

  // Get a category by ID
  getCategoryById(categoryId: number): Observable<ApiResponse<CategoryResponse>> {
    return this.http.get<ApiResponse<CategoryResponse>>(`${this.apiUrl}/${categoryId}`);
  }

  // Get all categories
  getAllCategories(): Observable<ApiResponse<CategoryResponse[]>> {
    return this.http.get<ApiResponse<CategoryResponse[]>>(`${this.apiUrl}/all`);
  }

  // Update a category
  updateCategory(categoryId: number, categoryRequest: CategoryRequest): Observable<ApiResponse<CategoryResponse>> {
    return this.http.put<ApiResponse<CategoryResponse>>(`${this.apiUrl}/${categoryId}`, categoryRequest);
  }

  // Delete a category
  deleteCategory(categoryId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${categoryId}`);
  }
}