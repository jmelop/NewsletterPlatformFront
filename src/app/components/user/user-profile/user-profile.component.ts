import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/users/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  _id: string = '';
  user: User = {name: '', email: '', password: '', tags: []};
  editable: boolean = false;
  editButtonLabel: string = "Editar";
  
  constructor(
    private userService: UserService,
    private cookieService: CookieService
  ) { 
    // this._id = this.cookieService.get("currentUserId");
    // this.userService.getUserById(this._id)
    // .then(res => this.user = res);
  }

  ngOnInit(): void {
    this._id = this.cookieService.get("currentUserId");
    this.userService.getUserById(this._id)
    .then(res => this.user = res);
  }

  deleteUser() {
    this.userService.deleteUser(this._id);
  }

  editUser() {
    if(this.editable) {
      this.userService.updateUser(this._id, this.user)
      this.editable = false;
      this.editButtonLabel = "Editar"
    } else {
      this.editable = true;
      this.editButtonLabel = "Guardar"
    }
  }
}
