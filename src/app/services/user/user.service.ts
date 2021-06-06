import { Identifiers } from '@angular/compiler';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from 'src/app/models/users/user.model';
import { environment } from 'src/environments/environment';

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


  constructor() { }

  getUserById(id: string): Promise <User> {
    return axios.get(`${this.apiUrl}${id}`, this.options)
    .then(res => {
      return res.data
    })
  }

}
