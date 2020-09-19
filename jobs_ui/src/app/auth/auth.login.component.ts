import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { first } from 'rxjs/operators'


@Component({
    templateUrl: './auth.login.component.html'
})

export class AuthLoginComponent implements OnInit {

    returnUrl: string;
    error = '';
    loading = false;

    constructor(private _authService: AuthService,
        private _router: Router,
        private _route: ActivatedRoute) {
        if (this._authService.currentUserValue) {
            this._router.navigate(['/jobs']);
        }
    }

    ngOnInit(): void {
        //this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/jobs';
    }

    onSubmit(data) {
        this.loading = true;
        this._authService.login(data)
            .pipe(first())
            .subscribe(
                data => {
                    this._router.navigate(['/jobs']);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}