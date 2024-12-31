import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { TokenService } from './token.service';
import { GeneralTransactionSummary, CategoryBreakdown, MonthlyInsights, SpendingPatterns, UserSpendingComparison, MonthlyRanking, ImpulsiveSpending, CategoryDiversity } from '../interfaces/analytics';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private apiUrl = environment.apiUrl;
  private analyticsUrl = `${this.apiUrl}/api/analytics`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  public getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.getToken()}`
    });
  }

  transactionSummary(): Observable<GeneralTransactionSummary> {
    const headers = this.getHeaders();
    return this.http.get<GeneralTransactionSummary>(`${this.analyticsUrl}/general-summary`, { headers });
  }

  categoryBreakdown(): Observable<CategoryBreakdown[]> {
    const headers = this.getHeaders();
    return this.http.get<CategoryBreakdown[]>(`${this.analyticsUrl}/category-breakdown`, { headers });
  }

  monthlyInsights(): Observable<MonthlyInsights> {
    const headers = this.getHeaders();
    return this.http.get<MonthlyInsights>(`${this.analyticsUrl}/monthly-insights`, { headers });
  }

  spendingPatterns(): Observable<SpendingPatterns> {
    const headers = this.getHeaders();
    return this.http.get<SpendingPatterns>(`${this.analyticsUrl}/spending-patterns`, { headers });
  }

  userComparison(): Observable<UserSpendingComparison> {
    const headers = this.getHeaders();
    return this.http.get<UserSpendingComparison>(`${this.analyticsUrl}/user-comparison`, { headers });
  }

  monthlyRanking(): Observable<MonthlyRanking> {
    const headers = this.getHeaders();
    return this.http.get<MonthlyRanking>(`${this.analyticsUrl}/monthly-ranking`, { headers });
  }

  impulsiveSpending(): Observable<ImpulsiveSpending> {
    const headers = this.getHeaders();
    return this.http.get<ImpulsiveSpending>(`${this.analyticsUrl}/impulse-metric`, { headers });
  }

  categoryDiversity(): Observable<CategoryDiversity> {
    const headers = this.getHeaders();
    return this.http.get<CategoryDiversity>(`${this.analyticsUrl}/category-diversity`, { headers });
  }
}
