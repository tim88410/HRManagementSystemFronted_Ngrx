import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { LeavesService, Leave } from '../services/leaves.service';
import { loadLeaves } from '../store/leaves/leaves.actions';
import { selectLeaves } from '../store/leaves/leaves.selectors';
import { Observable, BehaviorSubject, of, switchMap, take, map, tap, filter } from 'rxjs';

@Component({
  selector: 'app-leaves-demo-ab',
  templateUrl: './leaves-demo-ab.component.html',
  standalone: false
})
export class LeavesDemoABComponent implements OnInit {
  leaves$ = this.store.select(selectLeaves);
  private similarLeavesSubject = new BehaviorSubject<Leave[]>([]);
  similarLeaves$ = this.similarLeavesSubject.asObservable();

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private leavesService: LeavesService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const page = +params['Page'] || 1;
      const pageLimit = +params['PageLimit'] || 10;

      this.loadAndSearch(page, pageLimit);
    });
  }

  private loadAndSearch(page: number, pageLimit: number): void {
    // 1. 觸發載入 Leaves
    this.store.dispatch(loadLeaves({ page, pageLimit }));

    // 2. 當 leaves 有資料時，觸發 API 搜尋相似假別
    this.leaves$
      .pipe(
        filter(leaves => leaves.length > 0),
        take(1),
        map((leaves) => leaves[0]?.LeaveName),
        switchMap((leaveName) => {
          if (leaveName) {
            return this.leavesService.searchLeavesByName(leaveName).pipe(
              map((res) => res?.ReturnData?.ReturnData?.LeavesInfos || [])
            );
          }
          return of([]);
        })
      )
      .subscribe((results) => {
        this.similarLeavesSubject.next(results);
      });
  }

  goToEdit(id: number): void {
    this.router.navigate(['/leaves/edit', id]);
  }

  confirmDelete(id: number, userId: number): void {
    const confirmed = confirm(`你確定要刪除 id = ${id} 嗎？`);
    if (confirmed) {
      this.leavesService.deleteLeave(id, userId).subscribe(() => {

        this.route.queryParams
          .pipe(take(1))
          .subscribe(params => {
            const page = +params['Page'] || 1;
            const pageLimit = +params['PageLimit'] || 10;

            this.loadAndSearch(page, pageLimit);
          });
      });
    }
  }
}
