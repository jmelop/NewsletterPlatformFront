import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { errorMonitor } from 'events';
import { error } from 'selenium-webdriver';
import { SessionAdmin } from 'src/app/models/users/session.model';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { StorageService } from 'src/app/services/user/storage.service';
import { LogUser, User } from '../../../models/users/user.model';
import { CookieService } from 'ngx-cookie-service'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logAdmin: LogUser = {email: '', password: ''};
  
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
    this.authenticationService.loginAdmin(this.logAdmin)
    .then(res => {
        this.logAdmin.email = '';
        this.logAdmin.password = '';
        const token = res.token;
        const currentAdmin = res.user;
        this.cookieService.set('currentAdmin', currentAdmin, 4, '/' )
        this.cookieService.set('token_access', token, 4, '/');
        this.setSessionData(res);
    })
    .catch( err => {
      this.errorMessage = err.response.data
    })
  }

  setSessionData(data: SessionAdmin) {
    // this.storageService.setCurrentSession(data);
    console.log(data.user.role)

    if (data.user.role === 'user') {
      this.router.navigate(['home-user']);
    }
    if (data.user.role === 'admin') {
      this.router.navigate(['users']);
    }
  }
} 

