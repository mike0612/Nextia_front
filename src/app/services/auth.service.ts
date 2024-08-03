import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatusListener = new BehaviorSubject<boolean>(false);
  private base_url = environment.api_url;

  constructor(private http: HttpClient, private router: Router) { }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  signup(user: any) {
    return firstValueFrom(this.http.post(`${this.base_url}/auth/signup`, user));
  }

  login(email: string, password: string): Promise<{ token: string }> {
    return firstValueFrom(this.http.post<{ token: string }>(`${this.base_url}/auth/login`, { email, password }))
      .then(response => {
        console.log(response);
        const token = response.token;
        if (token) {
          localStorage.setItem('token', token);
          this.authStatusListener.next(true);
          this.router.navigate(['/invitaciones']);
        }
        return response;
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.authStatusListener.next(false);
    this.router.navigate(['/login']);
  }

  recoverPassword(email: string) {
    return firstValueFrom(this.http.post(`${this.base_url}/auth/recover`, { email }));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}
