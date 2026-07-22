import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private apiUrl = 'http://127.0.0.1:8000/api';

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/token/`, {
        username,
        password,
      })
      .pipe(
        tap((res) => {
          sessionStorage.setItem('access', res.access);
          sessionStorage.setItem('refresh', res.refresh);
        })
      );
  }

  logout() {
    sessionStorage.clear();
  }

  getToken(): string | null {
    return sessionStorage.getItem('access');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  getCurrentUser() {
  return this.http.get<{
    id: number;
    username: string;
    email: string;
  }>("http://127.0.0.1:8000/api/me/");
}
}