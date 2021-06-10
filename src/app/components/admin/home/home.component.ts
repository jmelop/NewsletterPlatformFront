import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Admin } from 'src/app/models/admin/admin.model';
import { AdminsService } from 'src/app/services/admin/admins.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private cookieService: CookieService, private adminsService: AdminsService) { }
  idUser: string = '';
  adminInfo: any = '' /* {username: '', email: '', password: ''}; */

  ngOnInit(): void {
     this.idUser = this.cookieService.get("currentAdminId");
     this.adminsService.getById(this.idUser).then( u => {
      this.adminInfo = u;
    })
   }

   getId(){
     console.log(this.adminInfo)
   }


}
