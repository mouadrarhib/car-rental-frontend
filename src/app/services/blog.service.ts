// services/blog.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogRequest, BlogResponse } from '../models/blog.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:8088/api/v1/blogs'; // Match your API base URL pattern

  constructor(private http: HttpClient) { }

  // Create a new blog post
  createBlog(blogRequest: BlogRequest): Observable<ApiResponse<BlogResponse>> {
    return this.http.post<ApiResponse<BlogResponse>>(this.apiUrl, blogRequest);
  }

  // Get a blog post by ID
  getBlogById(id: number): Observable<ApiResponse<BlogResponse>> {
    return this.http.get<ApiResponse<BlogResponse>>(`${this.apiUrl}/${id}`);
  }

  // Get all blog posts
  getAllBlogs(): Observable<ApiResponse<BlogResponse[]>> {
    return this.http.get<ApiResponse<BlogResponse[]>>(this.apiUrl);
  }

  // Search blog posts by keyword
  searchBlogs(keyword: string): Observable<ApiResponse<BlogResponse[]>> {
    return this.http.get<ApiResponse<BlogResponse[]>>(`${this.apiUrl}/search`, {
      params: { keyword }
    });
  }

  // Filter blog posts by category
  filterByCategory(category: string): Observable<ApiResponse<BlogResponse[]>> {
    return this.http.get<ApiResponse<BlogResponse[]>>(`${this.apiUrl}/category/${category}`);
  }

  // Update a blog post
  updateBlog(id: number, blogRequest: BlogRequest): Observable<ApiResponse<BlogResponse>> {
    return this.http.put<ApiResponse<BlogResponse>>(`${this.apiUrl}/${id}`, blogRequest);
  }

  // Delete a blog post
  deleteBlog(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }

  // Upload blog image
  uploadBlogImage(blogId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/image/${blogId}`, formData, {
      headers: new HttpHeaders({
        // No 'Content-Type' needed - browser will set it with boundary
      }),
      reportProgress: true,
      observe: 'events'
    });
  }
}