import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeavesComponent } from './leaves/components/leaves.component';
import { LeavesEditComponent } from './leaves/components/leaves-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'leaves', pathMatch: 'full' },
  { path: 'leaves', component: LeavesComponent },
  { path: 'leaves/edit/:id', component: LeavesEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}