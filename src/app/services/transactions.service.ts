import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { TokenService } from './token.service';
import { Transaction, CreateTransaction, UpdateTransaction } from '../interfaces/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private apiUrl = environment.apiUrl;
  private financeUrl = `${this.apiUrl}/api/finances`;

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

  getUserTransactions(): Observable<Transaction[]> {
    const headers = this.getHeaders();
    return this.http.get<Transaction[]>(this.financeUrl, { headers });
  }

  createTransaction(transaction: CreateTransaction): Observable<Transaction> {
    const headers = this.getHeaders();
    return this.http.post<Transaction>(this.financeUrl, transaction, { headers });
  }

  updateTransaction(transaction: Partial<UpdateTransaction>): Observable<Transaction> {
    const headers = this.getHeaders();
    return this.http.patch<Transaction>(`${this.financeUrl}/${transaction.id}`, transaction, { headers });
  }

  deleteTransaction(transactionId: string): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.financeUrl}/${transactionId}`, { headers });
  }
}
