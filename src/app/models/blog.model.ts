export interface BlogRequest {
    title: string;
    content: string;
    summary: string;
    author: string;
    category: string;
    date: string; // ISO date format
  }
  
  export interface BlogResponse {
    id: number;
    title: string;
    content: string;
    summary: string;
    author: string;
    category: string;
    date: string;
    imageUrl: string[]; // Array of image URLs
  }