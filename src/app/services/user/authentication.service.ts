import { Injectable } from '@angular/core';
import axios from 'axios';
import { LogUser, User } from 'src/app/models/users/user.model';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

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

  constructor(private storageService: StorageService) { }

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

  deleteUser(id: string) {
    return axios.delete(`${apiUrl}users/${id}`, options)
    .then(() => {
      this.storageService.logOut();
    })
  }

  updateUser(id: string, user: User) {
    return axios.patch(`${apiUrl}users/${id}/`, user, options)
      .then(res => {
        return res.data;
      })
  }


}
