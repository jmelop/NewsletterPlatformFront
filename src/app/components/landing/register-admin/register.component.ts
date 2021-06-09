import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { SessionAdmin } from 'src/app/models/users/session.model';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { StorageService } from 'src/app/services/user/storage.service';
import { Tag } from '../../../models/users/tag.model';
import { User } from '../../../models/users/user.model';
import { TagsService } from '../../../services/user/tags.service';
import { CookieService } from 'ngx-cookie-service'
import { Admin } from 'src/app/models/admin/admin.model';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterAdminComponent implements OnInit {

  newAdmin: Admin = {username: '', email: '', password: ''};

  errorMessage: string;

  constructor(
    private authenticationService: AuthenticationService, 
    private router: Router, 
    private storageService: StorageService,
    private cookieService: CookieService
  ) { 
  }

  ngOnInit(): void {
  }


  @ViewChildren("checkboxes") allCheckboxes: QueryList<ElementRef>;

  register() {
    this.authenticationService.registerAdmin(this.newAdmin)
      // .then(res => {
      //   this.authenticationService.loginAdmin({email: this.newUser.email, password: this.newUser.password})
        .then(res => {
          this.setSessionData(res);
          this.newAdmin.username = '';
          this.newAdmin.email = '';
          this.newAdmin.password = '';
        })

        // const token = res.token;
        // console.log('tokeeen', res.token)
        // this.cookieService.set('token', token, 4, '/');
      .catch(err  => {
        this.errorMessage = err.response.data
    });
  }

  setSessionData(data: SessionAdmin) {
    this.storageService.setCurrentAdminSession(data);
    this.router.navigate(['login'])
  }
}
