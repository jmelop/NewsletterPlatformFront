import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/users/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { Tag } from '../../../models/users/tag.model';
import { TagsService } from '../../../services/user/tags.service';

@Component({
  selector: 'app-user-tags',
  templateUrl: './user-tags.component.html',
  styleUrls: ['./user-tags.component.css']
})
export class UserTagsComponent implements OnInit {

  sessionUser: User = {name: '', email: '', password: '', tags: []}; 
  checkTagList: Tag[] = [];
  sessionUserId: string = ''; 

  constructor(
    private tagsService: TagsService,
    private userService: UserService,
    private cookieService: CookieService
    ) {
      this.sessionUserId = this.cookieService.get("currentUserId");
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
    this.userService.updateUser(this.sessionUser._id, this.sessionUser);
  }

  delete(name: string) {
    this.sessionUser.tags = this.sessionUser.tags.filter(tag => tag.name != name);
    this.userService.updateUser(this.sessionUser._id, this.sessionUser);
  }
}
