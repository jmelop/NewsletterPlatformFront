import { Injectable } from '@angular/core';
import { New } from '../models/new.model';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  apiUrl = "http://localhost:4000/news/";


  constructor() { }

  getAllNews(): Promise<New[]> {
    return axios.get(this.apiUrl + '?limit=10&offset=20')
      .then(rest => rest.data)
  }

  postNew(newNotice: New) {
    return axios.post(this.apiUrl, newNotice)
      .then(u => {
        return u.data;
      })
  }

  deleteNew(id: string) {
    return axios.delete(this.apiUrl + id)
      .then(u => {
        return 'OK';
      })
  }

}
