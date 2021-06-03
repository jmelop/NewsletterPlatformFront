import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users/user.model';
import { StorageService } from 'src/app/services/user/storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  name: string = '';
  email: string = '';
  role: string = '';
  user: User = null;

  
  constructor(private storageService: StorageService) { 
    this.user = storageService.getCurrentUser();
    this.name = this.user.name;
    this.email = this.user.email;
    this.role = this.user.role;
  }

  ngOnInit(): void {
  }

 

}
