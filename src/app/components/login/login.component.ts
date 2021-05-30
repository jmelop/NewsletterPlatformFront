import { Component, OnInit } from '@angular/core';
import { error } from 'selenium-webdriver';
import { LogUser } from '../../models/users/user.model';
import { UsersService } from '../../services/user/users.service';

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

