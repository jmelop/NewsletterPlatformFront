import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Session } from 'src/app/models/users/session.model';
import { LogUser } from 'src/app/models/users/user.model';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { StorageService } from 'src/app/services/user/storage.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  logUser: LogUser = {email: '', password: ''};
  
  errorMessage: string;


  constructor(
    private authenticationService: AuthenticationService , 
    private router: Router, 
    private storageService: StorageService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    const state = this.cookieService.check('token_access');

/*     if(state){
      this.setSessionData()
    } */
  }

  login() {
    this.authenticationService.login(this.logUser)
    .then(res => {
        this.logUser.email = '';
        this.logUser.password = '';
        const token = res.token;
        const currentUser = res.user;
        this.cookieService.set('currentUser', currentUser, 4, '/' )
        this.cookieService.set('token_access', token, 4, '/');
        this.setSessionData(res);
    })
    .catch( err => {
      this.errorMessage = err.response.data
    })
  }

  setSessionData(data: Session) {
    // this.storageService.setCurrentSession(data);
    console.log(data.user.role)

    if (data.user.role === 'user') {
      console.log('holaaaaa')
      this.router.navigate(['home-user']);
    }
    if (data.user.role === 'admin') {
      this.router.navigate(['users']);
    }
  }
}

