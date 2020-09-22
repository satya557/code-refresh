import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IJob } from './job';
import { JobService } from './job.service';

@Component({
    templateUrl: './job-detail.component.html',
    styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

    pageTitle: string = "Job information"
    job: IJob
    errorMessage: string

    constructor(private _jobService: JobService, private _router: Router, private _route: ActivatedRoute) { }

    ngOnInit(): void {
        var _id = this._route.snapshot.params['_id'];
        if(_id) {
            this.getJobById(_id);
        }
    }

    getJobById(_id: string) {
        this._jobService.getJobById(_id)
            .subscribe(result => {
                this.job = result[0];
            },
                error => this.errorMessage = <any>error
            )
    }

    onBack(): void {
        this._router.navigate(['/jobs']);
    }

}