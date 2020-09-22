import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../alert/alert.service';
import { IJob } from './job';
import { JobService } from './job.service';
import { Router, Route } from '@angular/router';

@Component({
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.css']
})

export class JobListComponent implements OnInit {
    pageTitle: string = "All Jobs in Repus Technologies India Pvt Limited";
    jobs: IJob[];
    errorMessage: string;

    constructor(private _jobService: JobService, 
        private _alertService: AlertService,
        private _router: Router) { }


    ngOnInit(): void {
        this._jobService.getJobs().subscribe(
            jobs => {
                this.jobs = jobs
            },
            error => this.errorMessage = <any>error
        )
    }

    onDelete(_id: string, code: string) : void {
        this._jobService.deleteJob(_id).subscribe(
            result => {
                this.ngOnInit();
                this._alertService.info("Job with code " + code + " deleted successfully");
            },
            error => this.errorMessage = <any>error
        )
    }

    onEdit() : void {
        this._alertService.warn("In Progress");
    }

    createJob(): void {
        this._router.navigate(['/jobs/job/new']);
    }
 }