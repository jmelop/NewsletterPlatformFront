import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from 'src/app/models/users/session.model';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { StorageService } from 'src/app/services/user/storage.service';
import { Tag } from '../../../models/users/tag.model';
import { User } from '../../../models/users/user.model';
import { TagsService } from '../../../services/user/tags.service';
import { CookieService } from 'ngx-cookie-service'

@Component({
  selector: 'app-register-admin',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterAdminComponent implements OnInit {

  newUser: User = {name: '', email: '', password: '', tags: []};

  checkTagList: Tag[] = [];
 
  errorMessage: string;

  constructor(
    private authenticationService: AuthenticationService, 
    private tagsService: TagsService, 
    private router: Router, 
    private storageService: StorageService,
        private cookieService: CookieService
  ) { 
  }

  ngOnInit(): void {
    this.tagsService.getAlltags()
    .then(taglist => this.checkTagList = taglist)
  }


  @ViewChildren("checkboxes") allCheckboxes: QueryList<ElementRef>;

  register() {
    this.newUser.tags = this.checkTagList.filter(tag => tag.checked == true);
    let newTagList = [];
    this.newUser.tags.map(tag => newTagList.push(tag._id));
    this.newUser.tags = newTagList;
    this.authenticationService.register(this.newUser)
      .then(res => {
        this.authenticationService.login({email: this.newUser.email, password: this.newUser.password})
        .then(res => {
          this.setSessionData(res);
          this.newUser.name = '';
          this.newUser.email = '';
          this.newUser.password = '';
          this.newUser.tags = [];
          this.allCheckboxes.forEach(checkbox => checkbox.nativeElement.checked = false);
        });

        // const token = res.token;
        // console.log('tokeeen', res.token)
        // this.cookieService.set('token', token, 4, '/');
      })
      .catch(err  => {
        this.errorMessage = err.response.data
    });
  }

  setSessionData(data: Session) {
    this.storageService.setCurrentSession(data);
    this.router.navigate(['login'])
  }
}
