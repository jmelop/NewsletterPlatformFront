import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Tag } from 'src/app/models/users/tag.model';
import { User } from 'src/app/models/users/user.model';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { TagsService } from 'src/app/services/user/tags.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  newUser: User = {owner: '', name: '', email: '', password: '', tags: []};

  checkTagList: Tag[] = [];
 
  errorMessage: string;

  constructor(
    private authenticationService: AuthenticationService, 
    private tagsService: TagsService, 
    private router: Router, 
  ) { 
  }

  ngOnInit(): void {
    // this.tagsService.getAlltags()
    // .then(taglist => this.checkTagList = taglist)
  }


  @ViewChildren("checkboxes") allCheckboxes: QueryList<ElementRef>;

  register() {
    this.authenticationService.registerUser(this.newUser)
        .then(res => {
          this.newUser.name = '';
          this.newUser.email = '';
          this.newUser.password = '';
          this.newUser.tags = [];
          this.router.navigate(['login-user'])
        })
      .catch(err  => {
        this.errorMessage = err.response.data
    });
  }
}
