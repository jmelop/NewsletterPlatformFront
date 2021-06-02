import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { errorMonitor } from 'events';
import { error } from 'selenium-webdriver';
import { LoginService } from 'src/app/services/user/login.service';
import { LogUser } from '../../models/users/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logUser: LogUser = {email: '', password: ''};
  

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.loginService.login(this.logUser)
    .then(res => {
      alert('estas logueado');
        this.logUser.email = '';
        this.logUser.password = '';
        this.router.navigate(['home-user'])
    })
    .catch( err => {
      throw err
    })
  }



  
}

