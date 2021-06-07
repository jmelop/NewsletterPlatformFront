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
        if (err.response.status === 403) {
          err.response.data = "Faltan campos por rellenar";
        }
        else if (err.response.status === 404) {
          err.response.data = 'Email ya existente';
        }
        else if (err.response.status === 500) {
          err.response.data = 'Ha habido un fallo, inténtelo de nuevo más tarde'
        }
        throw err
      });
    }

  login(loginData: LogUser) {
    return axios.post(`${apiUrl}login/`, loginData)
    .then(res => res.data)
    .catch((err) => {
      console.log('prueba serv', err.response);
      if (err.response.status === 403) {
        err.response.data = "Faltan campos por rellenar";
      }
      else if (err.response.status === 404) {
        err.response.data = 'Email y/o contraseña incorrecta';
      }
      throw err
    });
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
