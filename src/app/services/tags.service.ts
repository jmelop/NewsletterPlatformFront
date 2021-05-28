import { Injectable } from '@angular/core';
import { Tag } from '../models/tag.model';
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class TagsService {

  apiUrl = "http://localhost:4000/tags/";


  constructor() { }

  getAllTags(): Promise<Tag[]> {
    return axios.get(this.apiUrl + '?limit=10&offset=20')
      .then(rest => rest.data)
  }

  postTag(tag: Tag) {
    return axios.post(this.apiUrl, tag)
      .then(u => {
        return u.data;
      }).catch((err) => console.log(err))
  }

  deleteTag(id: string){
    return axios.delete(this.apiUrl + id)
    .then(u => {
      return 'OK';
    }).catch((err) => console.log(err))
  }

}
