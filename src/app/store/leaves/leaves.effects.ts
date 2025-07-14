import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as LeavesActions from './leaves.actions';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LeavesService } from '../../leaves/leaves.service';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class LeavesEffects {
  constructor(
    private actions$: Actions,
    private leavesService: LeavesService,
    private authService: AuthService
  ) {}

  loadLeaves$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LeavesActions.loadLeaves),
      switchMap(() =>
        this.authService.login().pipe(
          switchMap(() =>
            this.leavesService.getLeaves().pipe(
              map(data => LeavesActions.loadLeavesSuccess({ leaves: data })),
              catchError(err => of(LeavesActions.loadLeavesFailure({ error: err.message })))
            )
          )
        )
      )
    )
  );
}
