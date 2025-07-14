import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LeavesState } from './leaves.reducer';

export const selectLeavesState = createFeatureSelector<LeavesState>('leaves');

export const selectLeaves = createSelector(
  selectLeavesState,
  state => state.leaves
);
