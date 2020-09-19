import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IUser } from './user';
import { AlertService } from '../alert/alert.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private currentUserSubject = new BehaviorSubject<IUser>(null);
    public currentUser: Observable<IUser>;

    private _authUrl = "/api/v1/auth/signin";

    constructor(private _http: HttpClient, private _alertService: AlertService) { }

    public get currentUserValue(): IUser {
        return this.currentUserSubject.value;
    }

    login(user: IUser): Observable<IUser> {
        return this._http.post<any>(this._authUrl, user)
            .pipe(map(result => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(result));
                this.currentUserSubject.next(result);
                return result;
            }),
                catchError(this.handleError<IUser>('login'))
            );
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
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