import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LeavesEditComponent } from './leaves-edit.component';

@NgModule({
  declarations: [LeavesEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [LeavesEditComponent]
})
export class EditModule {}
