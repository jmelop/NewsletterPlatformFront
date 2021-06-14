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

  formatedDate = '';
  cronData = 'Select the date';
  success: boolean;
  emptyDay = '';
  emptyHour = '';
  emptyMinutes = '';
  idUser: string = '';
  adminInfo: any =  {username: '', email: '', password: ''}; 
  horas: number[] = [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  dias: string[] = ['NONE', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']


  ngOnInit(): void {
    this.idUser = this.cookieService.get("currentAdminId");
    this.adminsService.getById(this.idUser).then(u => {
      this.adminInfo = u;
      this.formatedDate = this.adminInfo.senddate;


      console.log(this.adminInfo)
    })
    //this.cronForm = new FormControl('0 0 1/1 * *');



  }

  getCron() {
    if (this.emptyDay == 'NONE') {
      this.emptyDay = '?'
    }
    this.cronData = '0 ' + this.emptyHour + ' * ' + this.emptyDay;
    this.adminInfo.senddate = this.cronData;
    this.formatedDate = this.cronData;
    this.adminsService.updateAdmin(this.adminInfo._id, this.adminInfo).then(u => {
    })
  }

  updateDate(){
    this.emptyMinutes = ':00:00'
  }

  updateAdmin(){
    this.adminsService.updateAdmin(this.adminInfo._id, this.adminInfo).then(u => {
      if(typeof u !== 'undefined'){
        this.success = true;
      }else{
        this.success = false;
      }
    })
  }


}
