import { ActionReducerMap } from '@ngrx/store';
import { LeavesState, leavesReducer } from '../leaves/store/leaves/leaves.reducer';

export interface AppState {
  leaves: LeavesState;
}

export const reducers: ActionReducerMap<AppState> = {
  leaves: leavesReducer,
};
