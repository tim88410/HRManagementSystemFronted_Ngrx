import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeavesComponent } from './leaves/leaves.component';

const routes: Routes = [
  { path: '', redirectTo: 'leaves', pathMatch: 'full' },
  { path: 'leaves', component: LeavesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}