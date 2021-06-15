import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { LogUser } from '../../../models/users/user.model';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logAdmin: LogUser = {email: '', password: ''};
  errorMessage: string;
  email: string;
  forgotErrorMessage: string;

  constructor(
    private authenticationService: AuthenticationService , 
    private router: Router, 
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authenticationService.loginAdmin(this.logAdmin)
    .then(res => {
        this.logAdmin.email = '';
        this.logAdmin.password = '';
        const token = res.token;
        const currentAdminId = res.user._id;
        this.cookieService.set('currentAdminId', currentAdminId, 4, '/' )
        this.cookieService.set('token_access', token, 4, '/');
        this.router.navigate(['users']);
    })
    .catch( err => {
      this.errorMessage = err.response.data
    })
  }

  forgotPassword() {
    this.authenticationService.forgotPasswordAdmin(this.email)
    .then(res => {
      this.email = '';
    })
    .catch(err => {
      this.forgotErrorMessage = err.response.data
    })
  }
} 

