import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable()
export class LeavesService {
  constructor(private http: HttpClient) {}

  getLeaves() {
    return this.http.get<any>('https://localhost:44378/v1/Leaves?Page=1&PageLimit=10')
      .pipe(
        map(res => res.ReturnData?.ReturnData?.LeavesInfos || [])
      );
  }

  getLeaveById(id: number) {
    return this.http.get<any>(`https://localhost:44378/v1/Leaves/${id}`)
      .pipe(map(res => res.ReturnData?.ReturnData));
  }

  updateLeave(data: any) {
    return this.http.put<any>('https://localhost:44378/v1/Leaves', data)
      .pipe(map(res => res.ReturnCode === 5));
  }
}
