import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users/user.model';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { StorageService } from 'src/app/services/user/storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  _id: string = '';
  user: User = null;
  editable: boolean = false;
  editButtonLabel: string = "Editar";
  
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private storageService: StorageService
  ) { 
    this.user = storageService.getCurrentUser();
    this._id = this.user._id;
  }

  ngOnInit(): void {
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
