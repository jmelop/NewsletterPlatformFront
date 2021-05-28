import { Component, OnInit } from '@angular/core';
import { Tag } from '../models/tag.model';
import { User } from '../models/user.model';
import { TagsService } from '../services/tags.service';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  newTags: any = [];
  tags: any = [];
  users: any = [];
  newUser: User = { name: '', email: '', role: '', tag: this.newTags }



  constructor(private userServices: UsersService, private tagsServices: TagsService) { }

  ngOnInit(): void {
    this.userServices.getAllUsers().then(u => { this.users = u });
    this.tagsServices.getAllTags().then(u => { this.tags = u });
  }

  addUser() {
    this.newUser.tag = this.newTags;
    this.userServices.post(this.newUser).then(u => {
      if (typeof u !== 'undefined') {
        this.users.push(u);
        this.newTags = [];
        this.newUser = { name: '', email: '', role: '', tag: this.newTags };
      }
    })
  }

  deleteUser(id: string) {
    this.userServices.deleteUser(id)
      .then(u => {
        const userFiltered = this.users.filter((user: any) => user._id != id);
        this.users = userFiltered;
      })
  }

  getCheckBox(tag: Tag) {
    let elem = this.newTags.find(element => element === tag.name);

    if (typeof elem === "undefined" || elem == null || elem === '') {
      this.newTags.push(tag.name);
    } else {
      const newTagsFilyeted = this.newTags.filter(elem => elem != tag.name)

      this.newTags = newTagsFilyeted;

    }
  }
}
