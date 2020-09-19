import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthLoginComponent } from './auth/auth.login.component';
import { JobListComponent } from './jobs/job-list.component';

const routes: Routes = [
  { path: '', component: JobListComponent, canActivate: [AuthGuard]},
  { path: 'login', component: AuthLoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
