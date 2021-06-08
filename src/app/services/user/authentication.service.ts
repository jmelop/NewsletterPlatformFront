import { Injectable } from '@angular/core';
import axios from 'axios';
import { LogUser, User } from 'src/app/models/users/user.model';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

const apiUrl = environment.apiUrl

const options = {
  headers: {
    'Authorization': localStorage.token
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
}
