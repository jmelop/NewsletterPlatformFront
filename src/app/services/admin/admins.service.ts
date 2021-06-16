import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { User } from '../../models/admin/user.model'
import { CookieService } from 'ngx-cookie-service'
import { Admin } from 'src/app/models/admin/admin.model';

const apiUrl = `${environment.apiUrl}admin/`
@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  constructor(private cookieService: CookieService) { }

  token = this.cookieService.get('token_access');

  options = {
    headers: {
      'Authorization': this.token
    }
  }

  getById(id: string): Promise<Admin[]> {
    return axios.get(apiUrl+id, this.options)
    .then( res =>{
      return res.data;
    })
  }

  updateAdmin(id: string, admin: any): Promise<Admin[]> {
    return axios.patch(apiUrl + 'editself/' + id , admin, this.options)
      .then(res => {
        return res.data;
      })
  }



}
