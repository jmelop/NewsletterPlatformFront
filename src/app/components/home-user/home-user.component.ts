import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/admin/news.service';
import { TagsService } from 'src/app/services/user/tags.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  news: any = []; //aqui tengo la noticia con todo su cuerpo

  constructor(
    private newsService: NewsService, 
    private tagsService: TagsService 
  ) { }

  ngOnInit(): void {
    this.newsService.getAllNews().then(data => { this.news = data});
  }

}
