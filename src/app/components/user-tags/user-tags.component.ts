import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { User } from 'src/app/models/users/user.model';
import { Tag } from '../../models/users/tag.model';
import { TagsService } from '../../services/user/tags.service';

@Component({
  selector: 'app-user-tags',
  templateUrl: './user-tags.component.html',
  styleUrls: ['./user-tags.component.css']
})
export class UserTagsComponent implements OnInit {
  [x: string]: any;

  newUser: User = {name: '', email: '', password: '', tag: []};

  tags: Tag[] = [];

  constructor(private tagsService: TagsService) { }

  ngOnInit(): void {
    this.tagsService.getAlltags()
    .then(taglist => this.tags = taglist)
  }

  setTag(tags: any) {
    let existTag = this.newUser.tag.find(t => t === tags.name);

    if (typeof existTag === "undefined" || existTag == null || existTag === "") {
      //Cambiado temporalmente
      this.newUser.tag.push(tags)
    }
    else {
      const filteredTags = this.newUser.tag.filter(t => t != tags.name);
      this.newUser.tag = filteredTags;
    }
  }
  
  @ViewChildren("checkboxes") allCheckboxes: QueryList<ElementRef>;

  add() {
    this.usersService.postUser(this.newUser)
      .then(res => {
        alert('se han añadido nuevas categorías');
        this.allCheckboxes.forEach(checkbox => checkbox.nativeElement.checked = false);
        this.router.navigate(['home-user'])
      })
      .catch(err  => {
          throw err
      });
  }
}
