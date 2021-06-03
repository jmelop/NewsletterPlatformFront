import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/user/storage.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
  }

  logOut() {
    this.storageService.logOut();
  }

}
