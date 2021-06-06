import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { User } from 'src/app/models/users/user.model';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { StorageService } from 'src/app/services/user/storage.service';
import { UserService } from 'src/app/services/user/user.service';
import { Tag } from '../../models/users/tag.model';
import { TagsService } from '../../services/user/tags.service';

@Component({
  selector: 'app-user-tags',
  templateUrl: './user-tags.component.html',
  styleUrls: ['./user-tags.component.css']
})
export class UserTagsComponent implements OnInit {
  [x: string]: any;

  sessionToken: string = '';
  sessionUser: User = {name: '', email: '', password: '', tags: []}; 
  checkTagList: Tag[] = [];
  sessionUserId: string = ''; 

  constructor(
    private tagsService: TagsService,
    private storageService: StorageService,
    private authenticationService: AuthenticationService,
    private userService: UserService
    ) {
      this.sessionToken = storageService.getCurrentToken();
      this.sessionUserId = storageService.getCurrentUser()._id;
      this.userService.getUserById(this.sessionUserId)
      .then(res => this.sessionUser = res);
     }

  ngOnInit(): void {
    this.tagsService.getAlltags()
    .then(taglist => this.checkTagList = taglist)
  }
  
  @ViewChildren("checkboxes") allCheckboxes: QueryList<ElementRef>;

  add() {
    let newTagList: Tag[]= [];
    newTagList = this.checkTagList.filter(tag => tag.checked == true)
    newTagList.map(tag => {
      let exist = this.sessionUser.tags.find(t => t.name == tag.name);
      if (!exist) this.sessionUser.tags.push(tag);
    });
    this.allCheckboxes.forEach(checkbox => checkbox.nativeElement.checked = false);
    this.authenticationService.updateUser(this.sessionUser._id, this.sessionUser);
    this.storageService.setCurrentSession({token: this.sessionToken, user: this.sessionUser});
  }

  delete(name: string) {
    this.sessionUser.tags = this.sessionUser.tags.filter(tag => tag.name != name);
    this.authenticationService.updateUser(this.sessionUser._id, this.sessionUser);
    this.storageService.setCurrentSession({token: this.sessionToken, user: this.sessionUser});
  }
}
