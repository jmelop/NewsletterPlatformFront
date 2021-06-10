import { Injectable } from '@angular/core';
import axios from 'axios';
import { New } from 'src/app/models/admin/new.model';
import { environment } from 'src/environments/environment';

const apiUrl =  `${environment.apiUrl}news/`;

const options = {
  headers: {
    'Authorization': environment.token
  }
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor() { }

  getNews(id: string): Promise<New[]> {
    return axios.get(`${apiUrl}owner/${id}`, options)
    .then(res => res.data)
  }
}
