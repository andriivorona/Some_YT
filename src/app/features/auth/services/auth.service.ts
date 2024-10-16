import {inject, Injectable} from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000'; // Змініть на свій URL
  private http = inject(HttpClient);
private router = inject(Router);
  register(username: string, password: string): Observable<any> {
    // return of(null)
    // return this.http.post(`${this.apiUrl}/register`, userData);
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  login(username: string, password: string): Observable<any> {
    // return of(null)
    // return this.http.post(`${this.apiUrl}/login`, credentials);
    console.log('username', username)
    console.log('password',password)
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      catchError(({error})=> {
        console.log(error);
         error.message === "Invalid credentials" ? this.router.navigate(['/auth/register']) : console.error('Login failed', error);
        return throwError(() => error)
      })
    )
  }

  // Додайте метод для отримання токена (якщо потрібно)
  saveToken(token: string): void {
    console.log('take token', token)
    localStorage.setItem('jwt', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  logout(): void {
    localStorage.removeItem('jwt');
  }

}
