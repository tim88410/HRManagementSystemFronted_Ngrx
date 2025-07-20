import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeavesComponent } from './components/leaves.component';
import { LeavesEditComponent } from './components/leaves-edit.component';
import { LeavesDemoABComponent } from './components/leaves-demo-ab.component';

const routes: Routes = [
  { path: '', component: LeavesComponent },
  { path: 'edit/:id', component: LeavesEditComponent },
  {
    path: 'demo-ab',
    component: LeavesDemoABComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeavesRoutingModule {}