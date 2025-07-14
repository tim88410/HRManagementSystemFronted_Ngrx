import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private readonly apiUrl = 'https://localhost:44378/Auth/login';
  private readonly authHeader = 'Basic c3U6MXFhekBXU1gzZWRj';

  constructor(private http: HttpClient) {}

  login(): Observable<string> {
    return this.http.post<{ ReturnCode: number; ReturnData: string }>(
      this.apiUrl,
      {},
      {
        headers: new HttpHeaders({
          Authorization: this.authHeader
        })
      }
    ).pipe(
      tap(res => {
        if (res.ReturnCode === 5) {
          localStorage.setItem('token', res.ReturnData);
        }
      }),
      map(res => res.ReturnData)
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token'); 
  }
}
