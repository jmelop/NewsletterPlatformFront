import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: User = {name: '', email: '', password: '', tag: []};
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  setTag(event: any) {
    if (event.target.checked) {
      this.newUser.tag.push(event.target.value)
    }
    else {
      this.newUser.tag.filter(value => value != event.target.value)
    }
  }

  register() { 
    console.log(this.newUser.tag)
    this.userService.postUser(this.newUser)
      .then(res => {
        alert('¡El usuario ha sido creado!');
      })
      .catch(err  => {
          throw err
      })
      this.newUser.name = '';
      this.newUser.email = '';
      this.newUser.password = '';
      this.newUser.tag = [];
  }
}

