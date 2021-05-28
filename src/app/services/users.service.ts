import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '../models/user.model'


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl = "http://localhost:4000/users/";


  constructor() { }

  getAllUsers(): Promise<User[]> {
    return axios.get(this.apiUrl + '?limit=10&offset=20')
      .then(rest => rest.data)
  }


  post(user: User) {
    return axios.post(this.apiUrl, user)
      .then(res => {
        return res.data;
      }).catch((err) => console.log(err))
  }


  deleteUser(id: string){
    return axios.delete(this.apiUrl + id)
    .then(res => {
      return 'OK'
    })
  }

}
