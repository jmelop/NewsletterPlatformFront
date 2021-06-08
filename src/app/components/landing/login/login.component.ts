import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { errorMonitor } from 'events';
import { error } from 'selenium-webdriver';
import { Session } from 'src/app/models/users/session.model';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { StorageService } from '../../../services/user/storage.service';
import { LogUser } from '../../../models/users/user.model';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
        this.cookieService.set('token_access', token, 4, '/');
        console.log(this.cookieService.get('token_access'))
        this.setSessionData(res);

    })
    .catch( err => {
      this.errorMessage = err.response.data
    })
  }

  setSessionData(data: Session) {
    this.storageService.setCurrentSession(data);
    if (data.user.role === 'user') {
      this.router.navigate(['home-user'])
    }
    if (data.user.role === 'admin') {
      this.router.navigate(['users']);
    }

  }


}

