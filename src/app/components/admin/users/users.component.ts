import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/admin/user.model';
import { TagsService } from '../../../services/admin/tags.service';
import { UsersService } from '../../../services/admin/users.service';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  newTags: any = [];
  newUser: User = { name: '', email: '', role: '', tags: this.newTags, password: '' }
  tags: any = [];
  users: any = [];

  constructor(private userServices: UsersService, private tagsServices: TagsService) { }

  ngOnInit(): void {
    this.userServices.getAllUsers().then(u => { this.users = u});
    this.tagsServices.getAllTags().then(u => { this.tags = u });
  }

  editState(user: any) {
    this.users.map((u: any) => {
      u.editable = false;
      user.editable = true;
    })

    this.tags.map(u => {
      let exist = user.tags.find(b => b.name == u.name);
      user.tags.find(b => {
        if(b.name == u.name){
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
    let newMappedUser = []; 
    this.newUser.tags.map(u => {
      newMappedUser.push(u._id)
    });

    this.newUser.tags = newMappedUser;
    this.userServices.post(this.newUser).then(res => {
      if (typeof res !== 'undefined') {
        this.users.push(this.newUser);
        this.newTags = [];
        this.newUser = { name: '', email: '', role: '', tags: this.newTags, password: '' };
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
    user.tags = user.tags.filter(u => u.checked == true);
    let tempTags = user.tags;
    let newMappedUser = []; 
    user.tags.map(u => {
      newMappedUser.push(u._id)
    });

    user.tags = newMappedUser;
    user.editable = false;
    this.userServices.updateUser(user._id, user).then(() => {
      user.tags = tempTags;
    })
  }

}
