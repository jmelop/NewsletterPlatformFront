import { Component, OnInit } from '@angular/core';
import { LogUser, User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  newUser: User = {name: '', email: '', password: ''};
  logUser: LogUser = {name: '', password: ''};
  

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  register() {
    this.userService.postUser(this.newUser)
      .then(res => {
        alert('¡El usuario ha sido creado!');
      })
  }
}
