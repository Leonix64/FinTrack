import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { TokenService } from './token.service';
import { Login, Register } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;
  private authUrl = `${this.apiUrl}/api/auth`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(loginData: Login): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const loginEndpoint = `${this.authUrl}/login`;
    
    return this.http.post(loginEndpoint, loginData, { headers });
  }

  register(registerData: Register): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const registerEndpoint = `${this.authUrl}/register`;

    return this.http.post(registerEndpoint, registerData, { headers });
  }
}
