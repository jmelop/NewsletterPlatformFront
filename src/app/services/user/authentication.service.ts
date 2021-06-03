import { Injectable } from '@angular/core';
import axios from 'axios';
import { LogUser, User } from 'src/app/models/users/user.model';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl
const token = environment.token;

const options = {
  headers: {
    'Authorization': token
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  register(user: User) {
    return axios.post(`${apiUrl}register/`, user, options)
      .then(res => res.data)
      .catch((err) => {
        throw err
      });
  }

  login(loginData: LogUser) {
    return axios.post(`${apiUrl}login/`, loginData)
    .then(res => res.data);
  }


}
