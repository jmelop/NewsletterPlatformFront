import { Injectable } from '@angular/core';
import axios from 'axios';
import { Admin } from 'src/app/models/admin/admin.model';
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

  registerAdmin(admin: Admin) {
    return axios.post(`${apiUrl}admin/register`, admin, options)
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

    registerUser(user: User) {
      return axios.post(`${apiUrl}user/register`, user, options)
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

  loginAdmin(loginData: LogUser) {
    return axios.post(`${apiUrl}admin/login`, loginData)
    .then(res => {
      console.log('reeees', res)
      return res.data})
    
    .catch((err) => {
      if (err.response.status === 403) {
        err.response.data = "Faltan campos por rellenar";
      }
      else if (err.response.status === 404) {
        err.response.data = 'Email y/o contraseña incorrecta';
      }
      throw err
    });
  }

  loginUser(loginData: LogUser) {
    return axios.post(`${apiUrl}user/login`, loginData)
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
