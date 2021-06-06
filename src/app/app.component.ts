import { Component } from '@angular/core';
import { User } from './models/users/user.model';
import { StorageService } from './services/user/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NewsletterPlatform';

  constructor(private storageService: StorageService) { }

  isLoggedIn = this.storageService.isAuthenticated();
  currentUser = this.storageService.getCurrentUser();

}
