import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { IUser } from './auth/user';
import { JobService } from './jobs/job.service';
@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [JobService]
})
export class AppComponent implements OnInit{

  title = 'my-jobs';
  currentUser: IUser;
  disableLogoutLink: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    if (this.authService.currentUserValue) {
      this.authService.currentUser
        .subscribe(
          x => this.currentUser = x
        );
    }
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.disableLogoutLink = true;
    this.router.navigate(['/login']);
  }
}
