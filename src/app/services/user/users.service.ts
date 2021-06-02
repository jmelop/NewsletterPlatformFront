import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../models/users/user.model'
import axios from 'axios';



const apiUrl = `${environment.apiUrl}users/`
const token = environment.token;

const options = {
  headers: {
    'Authorization': token
  }
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  postUser(user: User) {
    return axios.post(apiUrl, user, options)
      .then(res => {
        return 'Ok'
      }).catch((err) => {
        throw err
      });
  }
}