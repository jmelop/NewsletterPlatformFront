import { Component, OnInit } from '@angular/core';
import { error } from 'selenium-webdriver';
import { LogUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logUser: LogUser = {name: '', password: ''};
  

  constructor() { }

  ngOnInit(): void {
  }

  
}

