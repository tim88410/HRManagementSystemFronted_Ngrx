import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Leave {
  Id: number;
  LeaveName: string;
  Description: string;
  LeaveLimitHours: number;
  CreateDate: string;
  OperateUserId: number;
}

export interface LeavesResponse {
  ReturnCode: number;
  ReturnData: {
    ReturnCode: number;
    ReturnData: {
      LeavesInfos: Leave[];
      Total: number;
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class LeavesService {
  private baseUrl = 'https://localhost:44378/v1/Leaves';

  constructor(private http: HttpClient) {}

  getLeaves(page: number, pageLimit: number): Observable<LeavesResponse> {
    const url = `${this.baseUrl}?Page=${page}&PageLimit=${pageLimit}`;
    return this.http.get<LeavesResponse>(url);
  }

  // 新增 - 根據 ID 取得單筆 Leave 資料
  getLeaveById(id: number): Observable<{ ReturnCode: number, data: Leave | null }> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<{ ReturnCode: number, ReturnData: { ReturnData: Leave } }>(url).pipe(
      map(res => ({
        ReturnCode: res.ReturnCode,
        data: res.ReturnData?.ReturnData || null
      }))
    );
  }

  // 新增 - 更新 Leave
  updateLeave(payload: { UserId: number; Id: number; LeaveName: string; Description: string; LeaveLimitHours: number }): Observable<any> {
    const url = this.baseUrl;
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    if(payload.Id === 0)
    {
      return this.http.post(url, payload, { headers });
    }
    else
    {
      return this.http.put(url, payload, { headers });
    }
  }

  deleteLeave(id: number, userId: number): Observable<any> {
    const url = `${this.baseUrl}?Id=${id}&userId=${userId}`;
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(url, { headers });
  }

  searchLeavesByName(name: string): Observable<LeavesResponse> {
    const encoded = encodeURIComponent(name || '');
    const url = `${this.baseUrl}?Page=1&PageLimit=10&LeaveName=${encoded}`;
    console.log(url);
    return this.http.get<LeavesResponse>(url);
  }
}
