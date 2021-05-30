import { Injectable } from '@angular/core';
import { New } from '../models/new.model';
import axios from 'axios';
import { config } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = `${environment.apiUrl}news/`
const token = environment.token;

const options = {
  headers: {
    'Authorization': token
  }
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {



  constructor() { }

  getAllNews(): Promise<New[]> {
    return axios.get(apiUrl, options)
      .then(rest => rest.data)
  }

  postNew(newNotice: New) {
    return axios.post(apiUrl, newNotice, options)
      .then(res => {
        return res.data;
      }).catch((err) => console.log(err))
  }

  deleteNew(id: string) {
    return axios.delete(apiUrl + id, options)
      .then(() => {
        return 'OK'
      })
  }

  updateNew(id: string, news: New) {
    return axios.patch(apiUrl + id + '/', news, options)
      .then(res => {
        return res.data;
      })
  }
}
