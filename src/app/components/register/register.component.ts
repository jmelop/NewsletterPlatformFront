import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Tag } from 'src/app/models/tags.model';
import { User } from 'src/app/models/user.model';
import { TagsService } from 'src/app/services/tags/tags.service';
import { UserService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: User = {name: '', email: '', password: '', tag: []};

  tags: Tag[] = [];
  
  constructor(private userService: UserService, private tagsService: TagsService) { }

  ngOnInit(): void {
    this.tagsService.getAlltags()
    .then(taglist => this.tags = taglist)
  }

  setTag(tag: Tag) {
    let existTag = this.newUser.tag.find(t => t === tag.name);

    if (typeof existTag === "undefined" || existTag == null || existTag === "") {
      this.newUser.tag.push(tag.name)
    }
    else {
      const filteredTags = this.newUser.tag.filter(t => t != tag.name);
      this.newUser.tag = filteredTags;
    }
  }

  @ViewChildren("checkboxes") allCheckboxes: QueryList<ElementRef>;

  register() { 
    this.userService.postUser(this.newUser)
      .then(res => {
        alert('¡El usuario ha sido creado!');
        this.newUser.name = '';
        this.newUser.email = '';
        this.newUser.password = '';
        this.newUser.tag = [];
        this.allCheckboxes.forEach(checkbox => checkbox.nativeElement.checked = false);
      })
      .catch(err  => {
          throw err
      });
  }



}

