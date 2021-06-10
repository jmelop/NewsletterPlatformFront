import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { New } from 'src/app/models/admin/new.model';
import { UserOwner } from 'src/app/models/users/userowner.model';
import { NewsService } from 'src/app/services/user/news.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  news: New[] = [];
  sessionUserId: string = ''; 
  sessionUser: UserOwner = {owner: {_id: ''}, name: '', email: '', password: '', tags: []}; 


  constructor(
    private newsService: NewsService, 
    private cookieService: CookieService,
    private userService: UserService,
  ) { 
  }

  ngOnInit(): void {
    this.sessionUserId = this.cookieService.get("currentUserId");
    this.userService.getUserById(this.sessionUserId)
      .then(res => {
        this.sessionUser = res
        this.newsService.getNews(this.sessionUser.owner._id)
          .then(notice => {
            this.news = notice});
      });
  }
}

