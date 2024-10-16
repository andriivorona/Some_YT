import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private apiUrl = 'https://your-api-url.com'; // Змініть на реальний URL
  // private http = inject(HttpClient);

  login(credentials: any): Observable<any> {
    return of(null)
    // return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(userData: any): Observable<any> {
    return of(null)
    // return this.http.post(`${this.apiUrl}/register`, userData);
  }
}
