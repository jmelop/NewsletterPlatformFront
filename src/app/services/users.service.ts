import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "http://localhost:4000/users";

  constructor() { }


  postUser(user : User) {
    return axios.post(this.apiUrl, user)
      .then(res => {
        return 'Ok'
      });
  }
}
