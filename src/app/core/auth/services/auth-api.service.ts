import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/auth-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly http = inject(HttpClient);

  private readonly BASE = 'https://api.freeprojectapi.com/api/UserApp';

  login(body: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.BASE}/login`, body);
  }

  // ─── Refresh ────────────────────────────────────────────────────────
  // Adjust the payload shape once you know the real refresh endpoint contract.
  refresh(refreshToken: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.BASE}/refresh`, { refreshToken });
  }

  // ─── Logout ─────────────────────────────────────────────────────────
  // Adjust the payload shape once you know the real logout endpoint contract.
  logout(refreshToken: string): Observable<void> {
    return this.http.post<void>(`${this.BASE}/logout`, { refreshToken });
  }
}
