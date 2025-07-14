import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Leave {
  Id: number;
  LeaveName: string;
  Description: string;
  LeaveLimitHours: number;
  OperateUserId: number;
  CreateDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class LeavesService {
  private baseUrl = 'https://localhost:44378/v1/Leaves';

  constructor(private http: HttpClient) {}

  getLeaves(page: number, pageLimit: number): Observable<Leave[]> {
    const url = `${this.baseUrl}?Page=${page}&PageLimit=${pageLimit}`;
    return this.http.get<{ ReturnCode: number, ReturnData: { LeavesInfos: Leave[] } }>(url)
      .pipe(map(res => res.ReturnData.LeavesInfos));
  }

  // 新增 - 根據 ID 取得單筆 Leave 資料
  getLeaveById(id: number): Observable<Leave> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<{ ReturnCode: number, ReturnData: { ReturnData: Leave } }>(url)
      .pipe(map(res => res.ReturnData.ReturnData));
  }

  // 新增 - 更新 Leave
  updateLeave(payload: { UserId: number; Id: number; LeaveName: string; Description: string; LeaveLimitHours: number }): Observable<any> {
    const url = this.baseUrl;
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.put(url, payload, { headers });
  }
}
