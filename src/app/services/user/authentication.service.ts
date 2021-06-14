import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { Admin } from 'src/app/models/admin/admin.model';
import { LogUser, User } from 'src/app/models/users/user.model';
import { environment } from 'src/environments/environment';

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

  constructor( private cookieService: CookieService, private router: Router) { }

  registerAdmin(admin: Admin) {
    return axios.post(`${apiUrl}admin/register`, admin, options)
      .then(res => {
        console.log("adioooo", res);
        
        return res.data
      })
      .catch((err) => {
        if (err.response.status === 403) {
          err.response.data = "Faltan campos por rellenar";
        }
        else if (err.response.status === 400) {
          err.response.data = 'Email y/o username ya existentes, requeridos o inválidos';
        }
        else if (err.response.status === 500) {
          err.response.data = 'Ha habido un fallo, inténtelo de nuevo más tarde'
        }
        throw err
      });
    }

    registerUser(user: User) {
      return axios.post(`${apiUrl}register`, user, options)
        .then(res => res.data)
        .catch((err) => {
          if (err.response.status === 403) {
            err.response.data = "Faltan campos por rellenar";
          }
          else if (err.response.status === 400) {
            err.response.data = 'Faltan campos por rellenar y/o hay campos erróneos';
          }
          else if (err.response.status === 500) {
            err.response.data = 'Ha habido un fallo, inténtelo de nuevo más tarde'
          }
          else if (err.response.status === 404) {
            err.response.data = 'El owner no existe'
          }
          throw err
        });
      }

  loginAdmin(loginData: LogUser) {
    return axios.post(`${apiUrl}admin/login`, loginData)
    .then(res => res.data)
    .catch((err) => {
      if (err.response.status === 403) {
        err.response.data = "Faltan campos por rellenar";
      }
      else if (err.response.status === 404) {
        err.response.data = 'Email y/o contraseña incorrecta';
      }
      else if (err.response.status === 400) {
        err.response.data = 'Email y/o contraseña incorrecta';
      }
      throw err
    });
  }

  loginUser(loginData: LogUser) {
    return axios.post(`${apiUrl}login`, loginData)
    .then(res => res.data)
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

  forgotPassword(email: string) {
    return axios.post(`${apiUrl}forgot`, email)
    .then(res => {
      console.log(res)
      return res
    })
    .catch((err) => {
      console.log("el emaiiiil", email)
      console.log('el errorrrrr', err.message)

      if (err.response.status === 404) {
        err.response.data = "El email introducido no existe";
     }
      throw err
    });
  }

  logOut(): void {
    this.cookieService.delete('token_access');
    this.cookieService.delete('currentUserId');
    this.router.navigate(['login-user']);
  }

}
