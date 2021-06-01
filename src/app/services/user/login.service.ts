import { Injectable } from '@angular/core';
import axios from 'axios';
import { LogUser } from 'src/app/models/users/user.model';
import { environment } from 'src/environments/environment';


const apiUrl = `${environment.apiUrl}login/`
const token = environment.token;

const options = {
  headers: {
    'Authorization': token
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(loginData: LogUser) {
    return axios.post(apiUrl, loginData)
    .then(res => res.data);
  }

}
