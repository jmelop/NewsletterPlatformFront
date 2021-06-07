import { Injectable, Optional } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { User } from '../../models/admin/user.model'


const apiUrl = `${environment.apiUrl}users/`
const apiUrlRegister = `${environment.apiUrl}`
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


  getAllUsers(): Promise<User[]> {
    return axios.get(apiUrl, options)
      .then(rest => { 
        console.log(rest.data)
        return rest.data
      })
      
  }

  post(user: User) {
    return axios.post(apiUrlRegister+'register', user, options)
      .then(res => {
        return res.data;
      }).catch((err) => console.log(err))
  }

  getById(id: string){
    return axios.get(apiUrl+id, options)
    .then( res =>{
      return res.data;
    })
  }



  deleteUser(id: string) {
    return axios.delete(apiUrl + id, options)
      .then(() => {
        return 'OK'
      })
  }

  updateUser(id: string, user: User) {
    return axios.patch(apiUrl + id + '/', user, options)
      .then(res => {
        return res.data;
      })
  }
}
