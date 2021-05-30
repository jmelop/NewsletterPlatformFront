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
  newUser: User = { name: '', email: '', role: '', tag: this.newTags, password: '' }
  tags: any = [];
  users: any = [];

  constructor(private userServices: UsersService, private tagsServices: TagsService) { }

  ngOnInit(): void {
    this.userServices.getAllUsers().then(u => { this.users = u });
    this.tagsServices.getAllTags().then(u => { this.tags = u });
  }

  editState(user: any) {
    this.users.map((u: any) => {
      u.editable = false
      user.editable = true;
    })


  this.tags.map(u => {
      let exist = user.tag.find(b => b.name == u.name);
      if (!exist) {
        user.tag.push(u)
      }
    }) 
  }

  addUser() {
    this.newUser.tag = this.tags.filter(u => u.checked == true);
    this.userServices.post(this.newUser).then(res => {
      if (typeof res !== 'undefined') {
        this.users.push(res);
        this.newTags = [];
        this.newUser = { name: '', email: '', role: '', tag: this.newTags, password: '' };
      }
    })
  }

  deleteUser(id: string) {
    this.userServices.deleteUser(id)
      .then(() => {
        const userFiltered = this.users.filter((user: any) => user._id != id);
        this.users = userFiltered;
      })
  }

  updateUser(user: any) {
    user.tag = user.tag.filter(u => u.checked == true);
    user.editable = false;
    this.userServices.updateUser(user._id, user)
  }

}
