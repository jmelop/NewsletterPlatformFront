import { Component, OnInit } from '@angular/core';
import { error } from 'selenium-webdriver';
import { LoginService } from 'src/app/services/user/login.service';
import { LogUser } from '../../models/users/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logUser: LogUser = {name: '', password: ''};
  

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login() {
    this.loginService.login(this.logUser)
    .then(res => {
      console.log('estas logueado')
    })
    .catch( e => {
      
    })
  }



  
}

