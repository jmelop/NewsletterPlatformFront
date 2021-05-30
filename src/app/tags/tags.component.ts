import { Component, OnInit } from '@angular/core';
import { Tag } from '../models/admin/tag.model';
import { TagsService } from '../services/admin/tags.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  newTag: Tag = { name: ''}
  tags: any = [];

  constructor(private tagServices: TagsService) { }

  ngOnInit(): void {
    this.tagServices.getAllTags().then(u => { this.tags = u })
  }

  editState(tag: any) {

    this.tags.map((u: any) => {
      u.editable = false
      tag.editable = true;
    })

  }

  addTag() {
    this.tagServices.postTag(this.newTag).then(u => {
      if (typeof u !== 'undefined') {
        this.tags.push(u);
        this.newTag = { name: '' }
      }
    })
  }

  deleteTag(id: string){
    this.tagServices.deleteTag(id).then( u => {
      if (u === 'OK') {
        const tagFiltered = this.tags.filter((tag: any) => tag._id != id);
        this.tags = tagFiltered;
      }
    })
  }

  updateTag(tag: any) {
    tag.editable = false;
    this.tagServices.updateTag(tag._id, tag)
  }

}
