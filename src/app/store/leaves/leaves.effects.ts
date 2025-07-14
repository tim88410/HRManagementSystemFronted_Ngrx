import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as LeavesActions from './leaves.actions';
import { mergeMap, map, catchError, switchMap } from 'rxjs/operators';
import { LeavesService } from '../../leaves/leaves.service';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class LeavesEffects {
  constructor(
    private actions$: Actions,
    private leavesService: LeavesService,
    private authService: AuthService
  ) {}  

  loadLeaves$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(LeavesActions.loadLeaves),
      switchMap(({ page, pageLimit }) =>
        this.authService.login().pipe(
          switchMap(() =>
            this.leavesService.getLeaves(page, pageLimit).pipe(
              map(res => {
                const leaves = res.ReturnData?.ReturnData?.LeavesInfos ?? [];
                return LeavesActions.loadLeavesSuccess({ leaves });
              }),
              catchError(error => of(LeavesActions.loadLeavesFailure({ error })))
            )
          )
        )
      )
    )
  );
}
