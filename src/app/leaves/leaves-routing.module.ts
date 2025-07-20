import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeavesComponent } from './components/leaves.component';
import { LeavesEditComponent } from './components/leaves-edit.component';

const routes: Routes = [
  { path: '', component: LeavesComponent },
  { path: 'edit/:id', component: LeavesEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeavesRoutingModule {}