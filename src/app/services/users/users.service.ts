import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = `${environment.apiUrl}/users`;

  token = environment.token

  options = {
    headers: {
      'Authorization': this.token
    }
  }

  constructor() { }


  postUser(user : User) {
    return axios.post(this.apiUrl, user, this.options)
      .then(res => {
        return 'Ok'
      }).catch((err) => {
        throw err});
  }
}
