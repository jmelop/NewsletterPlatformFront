import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users/user.model';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { StorageService } from 'src/app/services/user/storage.service';

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
    private storageService: StorageService, 
    private authenticationService: AuthenticationService
  ) { 
    this.user = storageService.getCurrentUser();
    this._id = this.user._id;
  }

  ngOnInit(): void {
  }

  deleteUser() {
    this.authenticationService.deleteUser(this._id);
  }

  editUser() {
    if(this.editable) {
      this.authenticationService.updateUser(this._id, this.user)
      this.editable = false;
      this.editButtonLabel = "Editar"
    } else {
      this.editable = true;
      this.editButtonLabel = "Guardar"
    }
  }

 

}
