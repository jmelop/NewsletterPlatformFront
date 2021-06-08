import { Identifiers } from '@angular/compiler';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/users/user.model';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

const apiUrl = environment.apiUrl



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private storageService: StorageService,
    private cookieService: CookieService) { }
  
  options = {
    headers: {
      'Authorization': this.cookieService.get('token_access')
      // 'Authorization': environment.token
    }
  }

  getUserById(id: string): Promise <User> {
    return axios.get(`${apiUrl}users/${id}`, this.options)
    .then(res => {
      return res.data
    })
  }

  deleteUser(id: string) {
    return axios.delete(`${apiUrl}users/${id}`, this.options)
    .then(() => {
      this.storageService.logOut();
    })
  }

  updateUser(id: string, user: User) {
    return axios.patch(`${apiUrl}users/${id}/`, user, this.options)
      .then(res => {
        return res.data;
      })
  }
}
