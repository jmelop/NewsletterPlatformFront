import { Identifiers } from '@angular/compiler';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from 'src/app/models/users/user.model';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = `${environment.apiUrl}users/`;

  token = environment.token;

  options = {
    headers: {
      'Authorization': this.token
    }
  }

  constructor(private storageService: StorageService) { }

  getUserById(id: string): Promise <User> {
    return axios.get(`${this.apiUrl}${id}`, this.options)
    .then(res => {
      return res.data
    })
  }

  deleteUser(id: string) {
    return axios.delete(`${this.apiUrl}users/${id}`, this.options)
    .then(() => {
      this.storageService.logOut();
    })
  }

  updateUser(id: string, user: User) {
    return axios.patch(`${this.apiUrl}users/${id}/`, user, this.options)
      .then(res => {
        return res.data;
      })
  }

}
