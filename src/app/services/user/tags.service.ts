import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from 'src/app/models/users/user.model';
import { environment } from '../../../environments/environment';
import { Tag } from '../../models/users/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  apiUrl = `${environment.apiUrl}tags/`;

  token = environment.token

  options = {
    headers: {
      'Authorization': this.token
    }
  }

  constructor() { }

  getAlltags(): Promise<Tag[]> {
    return axios.get(this.apiUrl, this.options)
      .then(res => res.data)
  }

  getTagsFromUser(email : string): Promise<User> {
    return axios.get(this.apiUrl + email, this.options)
    .then(res => res.data)
    .then(res => {
      console.log(res.tags);
      return res.tags
    })
  }
}
