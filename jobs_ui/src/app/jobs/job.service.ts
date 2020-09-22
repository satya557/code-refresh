import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AlertService } from '../alert/alert.service';
import { IJob } from './job';

@Injectable({
    providedIn: 'root'
})
export class JobService {

    private JOBS_END_POINT: string = "/api/v1/jobs";

    constructor(private _http: HttpClient, private _alertService: AlertService) { }

    getJobs(): Observable<IJob[]> {
        return this._http.get<any>(this.JOBS_END_POINT)
            .pipe(map(result => {
                return result;
            }),
                catchError(this.handleError<IJob>('jobs'))
            );
    }

    getJobById(_id:string): Observable<IJob> {
        return this._http.get<any>(this.JOBS_END_POINT + '/' + _id)
            .pipe(map(result => {
                return result;
            }),
                catchError(this.handleError<IJob>('job'))
            );
    }

    deleteJob(_id:string): Observable<any> {
        return this._http.delete(this.JOBS_END_POINT + '/' + _id)
            .pipe(map(result => {
                console.log(result);
                return result;
            }),
                catchError(this.handleError<IJob>('jobs'))
            )
    }

    createJob(job: object): Observable<any> {
        return this._http.post(this.JOBS_END_POINT, job)
            .pipe(map(result => {
                return result;
            }),
            catchError(this.handleError<IJob>('jobs'))
            )
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            const options = {
                autoClose: false,
                keepAfterRouteChange: false
            };
            this._alertService.warn(error, options);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

}