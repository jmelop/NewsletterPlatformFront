import { Injectable } from '@angular/core';
import { Tag } from '../../models/admin/tag.model';
import axios from 'axios';
import { environment } from 'src/environments/environment';

const apiUrl = `${environment.apiUrl}tags/`
const token = environment.token;

const options = {
  headers: {
    'Authorization': token
  }
}

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor() { }

  getAllTags(): Promise<Tag[]> {
    return axios.get(apiUrl, options)
      .then(rest => rest.data)
  }

  postTag(tag: Tag) {
    return axios.post(apiUrl, tag, options)
      .then(res => {
        return res.data;
      }).catch((err) => console.log(err))
  }

  deleteTag(id: string) {
    return axios.delete(apiUrl + id, options)
      .then(() => {
        return 'OK'
      })
  }

  updateTag(id: string, tag: Tag) {
    return axios.patch(apiUrl + id + '/', tag, options)
      .then(res => {
        return res.data;
      })
  }
}
