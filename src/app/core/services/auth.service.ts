import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token = '';

  constructor(private http: HttpClient) {}

  login() {
    const headers = new HttpHeaders({
      Authorization: 'Basic c3U6MXFhekBXU1gzZWRj'
    });

    return this.http.post<any>('https://localhost:44378/Auth/login', {}, { headers })
      .pipe(map(res => {
        this.token = res.ReturnData;
        return this.token;
      }));
  }

  getToken(): string {
    return this.token;
  }
}
