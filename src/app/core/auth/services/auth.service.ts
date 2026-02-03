import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { LoginData, LoginRequest } from '../models/auth-response.model';

const ACCESS_TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'auth_refresh';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private readonly authApi = inject(AuthApiService);

  private readonly currentUser$ = new BehaviorSubject<LoginData | null>(this.hydrate());

  /** Any component / service can subscribe to know who is logged in. */
  user$ = this.currentUser$.asObservable();

  // Dummy credentials
  private readonly MOCK_USER = {
    email: 'admin@bloodlink.com',
    password: 'password123',
  };

  private decodeToken(token: string): Record<string, any> | null {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null; // malformed token — treat as invalid
    }
  }

  isTokenValid(): boolean {
    const token = this.getAccessToken();

    if (!token) return false;

    const payload = this.decodeToken(token);

    // Token is corrupt or has no exp claim → invalid
    if (!payload?.['exp']) return false;

    // exp is in seconds (Unix timestamp), Date.now() is in milliseconds
    const now = Date.now() / 1000;

    return payload['exp'] > now;
  }

  isAuthenticated(): boolean {
    return this.isTokenValid();
  }

  login(credentials: LoginRequest): Observable<LoginData> {
    return this.authApi.login(credentials).pipe(
      tap((response) => {
        // response.data contains userId, emailId, token, refreshToken
        this.persistTokens(response.data);
        this.currentUser$.next(response.data); // notify subscribers
      }),
      // Return only the data block so the caller doesn't have to unwrap
      // the envelope every time.
      // rxjs map would be cleaner but tap + returning the inner value
      // keeps the side-effect explicit.
      // Uncomment the map version if you prefer:
      map((response) => response.data),
    );
  }

  logout() {
    // const refreshToken = this.getRefreshToken();

    // if (refreshToken) {
    //   // Fire-and-forget: we don't wait for the server.
    //   // The finalize/error path still clears local state.
    //   this.authApi.logout(refreshToken).subscribe({
    //     error: () => {}, // silently ignore — local cleanup runs regardless
    //   });
    // }

    this.clearTokens();
    this.currentUser$.next(null);
    this.router.navigate(['/auth/login']);
  }

  private persistTokens(data: LoginData): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, data.token);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
  }
  private hydrate(): LoginData | null {
    const token = this.getAccessToken();
    if (!token) return null;

    // Validate before trusting
    if (!this.isTokenValid()) return null;

    // Decode the JWT payload to pull out any stored claims.
    // This API's token doesn't seem to contain userId/emailId in the
    // payload, so we store a minimal object.  Extend as needed.
    try {
      return {
        userId: 0, // hydrated from a separate storage key if needed
        emailId: localStorage.getItem('auth_email') ?? '',
        token: token,
        refreshToken: this.getRefreshToken() ?? '',
      };
    } catch {
      return null; // token is corrupt → treat as logged out
    }
  }
  // ─── Token accessors (used by the interceptor) ───────────────────
  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }
  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }
  /**
   * Removes both tokens and any other auth-related keys.
   */
  private clearTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
}
