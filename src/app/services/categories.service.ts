import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { TokenService } from './token.service';
import { Category, CreateCategory, UpdateCategory } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = environment.apiUrl;
  private categoryUrl = `${this.apiUrl}/api/categories`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    });
  }

  getUserCategories(): Observable<Category[]> {
    const headers = this.getHeaders();
    return this.http.get<Category[]>(this.categoryUrl, { headers });
  }

  createCategory(category: CreateCategory): Observable<Category> {
    const headers = this.getHeaders();
    return this.http.post<Category>(this.categoryUrl, category, { headers });
  }

  updateCategory(category: Partial<UpdateCategory>): Observable<Category> {
    const headers = this.getHeaders();
    return this.http.patch<Category>(`${this.categoryUrl}/${category.id}`, category, { headers });
  }

  deleteCategory(categoryId: string): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.categoryUrl}/${categoryId}`, { headers });
  }
}
