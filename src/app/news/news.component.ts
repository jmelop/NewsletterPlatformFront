import { Component, OnInit } from '@angular/core';
import { New } from '../models/new.model';
import { Tag } from '../models/tag.model';
import { NewsService } from '../services/news.service';
import { TagsService } from '../services/tags.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  newTags: any = [];
  tags: any = [];
  news: any = [];
  newNew: New = { title: '', body: '', link: '', tag: this.newTags }

  constructor(private newsService: NewsService, private tagsService: TagsService) { }

  ngOnInit(): void {
    this.newsService.getAllNews().then(u => { this.news = u });
    this.tagsService.getAllTags().then(u => { this.tags = u });
  }

  addNew(newNotice: New) {
    this.newNew.tag = this.newTags;
    this.newsService.postNew(newNotice).then(u => {
      if (typeof u !== "undefined") {
        this.news.push(u);
        this.newNew = { title: '', body: '', link: '', tag: '' }
      }
    })
  }

  deleteNew(id: string) {
    this.newsService.deleteNew(id).then(u => {
      if (u === 'OK') {
        const newsFiltered = this.news.filter((news: any) => news._id != id);
        this.news = newsFiltered;
      }
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
