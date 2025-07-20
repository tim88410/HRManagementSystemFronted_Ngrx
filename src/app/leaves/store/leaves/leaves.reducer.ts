import { createReducer, on } from '@ngrx/store';
import * as LeavesActions from './leaves.actions';

export interface LeavesState {
  leaves: any[];
  error: string | null;
}

export const initialState: LeavesState = {
  leaves: [],
  error: null
};

export const leavesReducer = createReducer(
  initialState,
  on(LeavesActions.loadLeavesSuccess, (state, { leaves }) => ({ ...state, leaves })),
  on(LeavesActions.loadLeavesFailure, (state, { error }) => ({ ...state, error }))
);
