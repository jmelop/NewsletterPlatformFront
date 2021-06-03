import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from 'src/app/models/users/session.model';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { StorageService } from 'src/app/services/user/storage.service';
import { Tag } from '../../models/users/tag.model';
import { User } from '../../models/users/user.model';
import { TagsService } from '../../services/user/tags.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: User = {name: '', email: '', password: '', tags: []};

  tags: Tag[] = [];
  
  constructor(
    private authenticationService: AuthenticationService, 
    private tagsService: TagsService, 
    private router: Router, 
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.tagsService.getAlltags()
    .then(taglist => this.tags = taglist)
  }

  setTag(tags: any) {
    let existTag = this.newUser.tags.find(t => t === tags.name);

    if (typeof existTag === "undefined" || existTag == null || existTag === "") {
      //Cambiado temporalmente
      this.newUser.tags.push(tags)
    }
    else {
      const filteredTags = this.newUser.tags.filter(t => t != tags.name);
      this.newUser.tags = filteredTags;
    }
  }

  @ViewChildren("checkboxes") allCheckboxes: QueryList<ElementRef>;

  register() {
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
      })
      .catch(err  => {
          throw err
      });
  }

  setSessionData(data: Session) {
    this.storageService.setCurrentSession(data);
    this.router.navigate(['home-user'])
  }
}
