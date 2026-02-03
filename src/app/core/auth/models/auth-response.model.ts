/**
 * Payload sent TO the backend on POST /login
 */
export interface LoginRequest {
  emailId:  string;
  password: string;
}

/**
 * The "data" block inside a successful login response.
 * Mirrors the exact JSON the API returns.
 */
export interface LoginData {
  userId:      number;
  emailId:      string;
  token:        string;   // JWT access token
  refreshToken: string;   // opaque refresh token
}

/**
 * Full top-level response envelope from the API.
 * Every success response from this backend follows this shape.
 */
export interface ApiResponse<T> {
  message: string;
  result:  boolean;   // true = success, false = failure
  data:    T;
}

/**
 * Convenience alias used by AuthService and AuthApiService.
 */
export type LoginResponse = ApiResponse<LoginData>;
