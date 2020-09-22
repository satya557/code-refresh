import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { JobCreateComponent } from './job-create.component';
import { JobDetailComponent } from './job-detail.component';
import { JobListComponent } from './job-list.component';
import { JobService } from './job.service';


@NgModule({
    declarations: [
        JobListComponent,
        JobDetailComponent,
        JobCreateComponent
    ],
    imports: [
        RouterModule.forChild([
            {
                path: 'jobs',
                component: JobListComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'jobs/:_id',
                component: JobDetailComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'jobs/job/new',
                component: JobCreateComponent,
                canActivate: [AuthGuard]
            }
        ]),
        SharedModule
    ],
    providers: [JobService]
})

export class JobModule {

}