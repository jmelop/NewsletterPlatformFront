import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Tag } from '../../models/users/tag.model';
import { User } from '../../models/users/user.model';
import { TagsService } from '../../services/user/tags.service';
import { UsersService } from '../../services/user/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: User = {name: '', email: '', password: '', tags: []};

  tags: Tag[] = [];
  
  constructor(private usersService: UsersService, private tagsService: TagsService) { }

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
    this.usersService.postUser(this.newUser)
      .then(res => {
        alert('¡El usuario ha sido creado!');
        this.newUser.name = '';
        this.newUser.email = '';
        this.newUser.password = '';
        this.newUser.tags = [];
        this.allCheckboxes.forEach(checkbox => checkbox.nativeElement.checked = false);
      })
      .catch(err  => {
          throw err
      });
  }

  



}
