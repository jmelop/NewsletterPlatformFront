import { Injectable, Optional } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { User } from '../../models/admin/user.model'
import { CookieService } from 'ngx-cookie-service'

const apiUrl = `${environment.apiUrl}users/`

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private cookieService: CookieService) { }

  token = this.cookieService.get('token_access');

  options = {
    headers: {
      'Authorization': `${environment.token}`
    }
  }

  getAllUsers(): Promise<User[]> {
    return axios.get(apiUrl, this.options)
      .then(rest => { 
        return rest.data
      })
  }

  post(user: User) {
    return axios.post(apiUrl, user, this.options)
      .then(res => {
        return res.data;
      }).catch((err) => console.log(err))
  }

  getById(id: string): Promise<User[]> {
    return axios.get(apiUrl+id, this.options)
    .then( res =>{
      return res.data;
    })
  }



  deleteUser(id: string) {
    return axios.delete(apiUrl + id, this.options)
      .then(() => {
        return 'OK'
      }).catch((err) => console.log(err))
  }

  updateUser(id: string, user: User): Promise<User[]> {
    return axios.patch(apiUrl + id + '/', user, this.options)
      .then(res => {
        return res.data;
      })
  }
}
