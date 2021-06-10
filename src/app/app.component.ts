import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NewsletterPlatform';

  constructor(
    private cookieService: CookieService,
    private userService: UserService
  ) { }

  //isLoggedIn = this.cookieService.check('token_access');
  //currentUserId = this.cookieService.get('currentUserId');
  //currentUser = this.userService.getUserById(this.currentUserId);
}
