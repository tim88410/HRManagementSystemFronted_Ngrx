import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LeaveNameDropdownComponent } from './components/leave-name-dropdown/leave-name-dropdown.component';
import { ButtonStyleDirective } from './directives/button-style.directive';

@NgModule({
  declarations: [
    LeaveNameDropdownComponent,
    ButtonStyleDirective
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    LeaveNameDropdownComponent,
    ButtonStyleDirective,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule {}