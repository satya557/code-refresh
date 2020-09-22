import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from './job.service';

@Component({
    templateUrl: './job-create.component.html',
    styles: ['./job-create.component.css']
})

export class JobCreateComponent implements OnInit {

    jobCreateForm: FormGroup;
    errorMessage: string;
    pageTitle: string = "Post Job in Repus Technologies"

    constructor(private _jobService: JobService, private _router: Router) { }

    ngOnInit(): void {
        this.jobCreateForm = new FormGroup({
            jobCode: new FormControl('', [Validators.required]),
            jobTitle: new FormControl('', [Validators.required]),
            jobStatus: new FormControl('', [Validators.required]),
            jobLocation: new FormControl('', [Validators.required]),
            jobDescription: new FormControl(''),
        });
    }

    onSubmit() {
        console.log(this.jobCreateForm.value);
        this._jobService.createJob(this.jobCreateForm.value)
            .subscribe(result => {
                console.log(result);
                this._router.navigate(['/jobs']);
            },
                error => this.errorMessage = <any>error
            );
    }
}