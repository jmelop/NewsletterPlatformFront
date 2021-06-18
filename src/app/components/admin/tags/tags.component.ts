import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Tag } from '../../../models/admin/tag.model';
import { TagsService } from '../../../services/admin/tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  adminInfo = '';
  newTag: Tag = { name: '', owner: '' }
  tags: Tag[] = [];
  tagAdded: boolean = false;
  tagAddedError: boolean = false;
  errorType: string = '';

  constructor(private tagServices: TagsService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.adminInfo = this.cookieService.get("currentAdminId");
    this.tagServices.getAllTags(this.adminInfo).then(u => { this.tags = u })
  }

  editState(tag: Tag) {

    this.tags.map((u: Tag) => {
      u.editable = false
      tag.editable = true;
    })

  }

  addTag() {
    this.newTag.owner = this.adminInfo;
    this.tagServices.postTag(this.newTag).then(u => {
      if (typeof u !== 'undefined') {
        this.tags.push(u);
        this.newTag = { name: '', owner: this.adminInfo }
        this.tagAdded = true;
        this.tagAddedError = false;


      }
    }).catch(err => {
      this.tagAdded = false;
      this.tagAddedError = true;
      this.errorType = err.response.data;
    })
  }

  deleteTag(id: string) {
    this.tagServices.deleteTag(id).then(u => {
      if (u === 'OK') {
        const tagFiltered = this.tags.filter((tag: Tag) => tag._id != id);
        this.tags = tagFiltered;
      }
    })
  }

  updateTag(tag: Tag) {
    tag.editable = false;
    this.tagServices.updateTag(tag._id, tag)
  }

}
