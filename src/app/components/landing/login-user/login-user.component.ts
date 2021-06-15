import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LogUser } from 'src/app/models/users/user.model';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  logUser: LogUser = {email: '', password: ''};
  errorMessage: string;
  email: string;
  forgotErrorMessage: string;
  successSendMessage: string;


  constructor(
    private authenticationService: AuthenticationService, 
    private router: Router, 
    private cookieService: CookieService
  ) { }

  ngOnInit(): void { }

  login() {
    this.authenticationService.loginUser(this.logUser)
    .then(res => {
        this.logUser.email = '';
        this.logUser.password = '';
        const token = res.token;
        const currentUserId = res.user._id;
        this.cookieService.set('currentUserId', currentUserId, 4, '/' )
        this.cookieService.set('token_access', token, 4, '/');
        this.router.navigate(['home-user']);
    })
    .catch( err => {
      this.errorMessage = err.response.data
    })
  }

  forgotPassword() {
    this.authenticationService.forgotPasswordUser(this.email)
    .then(res => {
      this.email = '';
      this.successSendMessage = '¡Mensaje enviado con éxito!'
    })
    .catch(err => {
      this.forgotErrorMessage = err.response.data
    })
  }

  setSuccessMessage() {
    this.successSendMessage = null;
  }
}

