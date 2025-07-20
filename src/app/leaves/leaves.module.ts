import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { LeavesRoutingModule } from './leaves-routing.module';
import { LeavesComponent } from './components/leaves.component';
import { LeavesEditComponent } from './components/leaves-edit.component';

import { LeaveNameDropdownComponent } from '../shared/components/leave-name-dropdown/leave-name-dropdown.component';

import { leavesReducer } from './store/leaves/leaves.reducer';
import { LeavesEffects } from './store/leaves/leaves.effects';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LeavesComponent,
    LeavesEditComponent,
    LeaveNameDropdownComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LeavesRoutingModule,
    StoreModule.forFeature('leaves', leavesReducer),
    EffectsModule.forFeature([LeavesEffects]),
    SharedModule 
  ]
})
export class LeavesModule { }