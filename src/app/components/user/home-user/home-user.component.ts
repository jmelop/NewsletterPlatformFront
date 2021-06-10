import { Component, OnInit } from '@angular/core';
import { New } from 'src/app/models/admin/new.model';
import { NewsService } from 'src/app/services/admin/news.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  news: New[] = []; 

  constructor(
    private newsService: NewsService, 
  ) { }

  ngOnInit(): void {
    //this.newsService.getAllNews().then(data => { this.news = data});
  }
}
