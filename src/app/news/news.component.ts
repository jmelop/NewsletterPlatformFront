import { Component, OnInit } from '@angular/core';
import { New } from '../models/admin/new.model';
import { NewsService } from '../services/admin/news.service';
import { TagsService } from '../services/admin/tags.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public Editor = ClassicEditor;
  newTags: any = [];
  tags: any = [];
  news: any = [];
  newNew: New = { title: '', body: '', link: '', tag: this.newTags }

  constructor(private newsService: NewsService, private tagsService: TagsService) { }

  ngOnInit(): void {
    this.newsService.getAllNews().then(u => { this.news = u });
    this.tagsService.getAllTags().then(u => { this.tags = u });
  }

  editState(news: any) {
    this.newTags = news.tag;

    this.tags.map((u: any) => {
      u.editable = false
      news.editable = true;
    })


  this.tags.map(u => {
      let exist = news.tag.find(b => b.name == u.name);
      if (!exist) {
        news.tag.push(u)
      }
    }) 
  }

  addNew() {
    this.newNew.tag = this.tags.filter(u => u.checked == true);
    this.newsService.postNew(this.newNew).then(u => {
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

  updateNews(news: any) {
    news.tag = news.tag.filter(u => u.checked == true);
    news.editable = false;
    this.newsService.updateNew(news._id, news)
  }


}
