import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/models/admin/tag.model';
import { User } from '../../../models/admin/user.model';
import { TagsService } from '../../../services/admin/tags.service';
import { UsersService } from '../../../services/admin/users.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  newTags: Tag[] = [];
  newUser: User = { name: 'test', email: 'test@gmail.com', role: 'user', tags: this.newTags, password: '1212' }
  tags: Tag[] = [];
  tempTags: Tag[] = [];
  users: User[] = [];

  constructor(private userServices: UsersService, private tagsServices: TagsService) { }

  ngOnInit(): void {
    this.userServices.getAllUsers().then(u => { this.users = u });
    this.tagsServices.getAllTags().then(u => { this.tags = u });
  }

  editState(user: User) {
    this.users.map((u: User) => {
      u.editable = false;
      user.editable = true;
    })

    this.tags.map(u => {
      u.checked = false;
      let exist = user.tags.find(b => b.name == u.name);
      user.tags.find(b => {
        if (b.name == u.name) {
          b.checked = true;
        }
      });

      if (!exist) {
        user.tags.push(u)
      }
    })
  }

  addUser() {
    this.newUser.tags = this.tags.filter(u => u.checked == true);
    let temporalTags = this.newUser.tags;
    let newMappedUser = [];
    this.newUser.tags.map(u => {
      newMappedUser.push(u._id)
    });

    this.newUser.tags = newMappedUser;
    this.userServices.post(this.newUser).then(res => {
      if (typeof res !== 'undefined') {
        res.tags = temporalTags;
        this.users.push(res);
        this.newUser = { name: '', email: '', role: '', tags: this.newTags, password: '' };
      }
    }).catch((err) => console.log(err))
  }

  deleteUser(id: string) {
    this.userServices.deleteUser(id)
      .then(() => {
        const userFiltered = this.users.filter((user: User) => user._id != id);
        this.users = userFiltered;
      }).catch((err) => console.log(err))
  }

  updateUser(user: User) {
    let tempTags = user.tags.filter(u => u.checked == true);
    let newMappedUser = [];
    tempTags.map(u => {
      newMappedUser.push(u._id)
    });

    user.tags = newMappedUser;

    user.editable = false;
    this.userServices.updateUser(user._id, user).then(() => {
      user.tags = tempTags;
    })
  }

}
