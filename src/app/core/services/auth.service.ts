import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(): Observable<string> {
    const headers = new HttpHeaders({
      Authorization: 'Basic c3U6MXFhekBXU1gzZWRj'
    });

    return this.http.post<{ ReturnCode: number, ReturnData: string }>(
      'https://localhost:44378/Auth/login',
      null,
      { headers }
    ).pipe(
      tap(res => {
        localStorage.setItem('token', res.ReturnData); // 存到 localStorage 給 interceptor 用
      }),
      map(res => res.ReturnData)
    );
  }
}
