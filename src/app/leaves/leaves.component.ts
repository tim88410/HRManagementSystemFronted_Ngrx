import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadLeaves } from '../store/leaves/leaves.actions';
import { selectLeaves } from '../store/leaves/leaves.selectors';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html'
})
export class LeavesComponent implements OnInit {
  leaves$ = this.store.select(selectLeaves);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadLeaves());
  }
}
