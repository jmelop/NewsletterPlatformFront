import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cookieService: CookieService) { }
  idUser: string = '';

  ngOnInit(): void {
     this.idUser = this.cookieService.get("currentAdminId");
   }

}
