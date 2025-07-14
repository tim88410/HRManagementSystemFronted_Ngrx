import { createAction, props } from '@ngrx/store';

export const loadLeaves = createAction('[Leaves] Load Leaves');
export const loadLeavesSuccess = createAction(
  '[Leaves] Load Leaves Success',
  props<{ leaves: any[] }>()
);
export const loadLeavesFailure = createAction(
  '[Leaves] Load Leaves Failure',
  props<{ error: string }>()
);
