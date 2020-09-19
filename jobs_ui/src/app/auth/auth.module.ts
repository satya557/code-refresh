import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthLoginComponent } from './auth.login.component';
import { AuthService } from './auth.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        AuthLoginComponent
    ],
    imports: [
        RouterModule.forChild([
            {
                path: 'login',
                component: AuthLoginComponent
            }
        ]),
        SharedModule
    ],
    providers: [AuthService]
})

export class AuthModule {

}