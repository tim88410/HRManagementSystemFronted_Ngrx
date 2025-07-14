import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { loadLeaves } from '../store/leaves/leaves.actions';
import { selectLeaves } from '../store/leaves/leaves.selectors';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html'
})
export class LeavesComponent implements OnInit {
  leaves$ = this.store.select(selectLeaves);

  constructor(
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadLeaves());
  }

  goToEdit(id: number): void {
    this.router.navigate(['/leaves/edit', id]);
  }
}
