import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { ActivatedRoute } from '@angular/router';
import { loadLeaves } from '../store/leaves/leaves.actions';
import { selectLeaves } from '../store/leaves/leaves.selectors';
import { LeavesService } from '../services/leaves.service';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html'
})
export class LeavesComponent implements OnInit {
  leaves$ = this.store.select(selectLeaves);

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private leavesService: LeavesService
  ) {}

  ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
      const page = +params['Page'] || 1;
      const pageLimit = +params['PageLimit'] || 10;
      this.store.dispatch(loadLeaves({ page, pageLimit }));
    });
  }

  goToEdit(id: number): void {
    this.router.navigate(['/leaves/edit', id]);
  }

  confirmDelete(id: number, userId: number): void {
    const confirmed = confirm(`你確定要刪除 id = ${id} 嗎？`);
    if (confirmed) {
      // 呼叫 API 刪除後刷新列表
      this.leavesService.deleteLeave(id, userId).subscribe(() => {
        this.route.queryParams.subscribe(params => {
          const page = +params['Page'] || 1;
          const pageLimit = +params['PageLimit'] || 10;
          this.store.dispatch(loadLeaves({ page, pageLimit }));
        });
      });
    }
  }
}
