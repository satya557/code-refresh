import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { JobsService } from './jobs/job.service';
import { IUser } from './auth/user';
@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [JobsService]
})
export class AppComponent {

  title = 'my-jobs';
  currentUser: IUser;

  constructor(private router: Router, private authService: AuthService) {
    //if(this.authService.currentUserValue) {
      //this.authService.currentUser
      //.subscribe(
        //x => this.currentUser = x
      //);
    //}
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
