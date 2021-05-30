import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { Tag } from '../../models/users/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  apiUrl = `${environment.apiUrl}tags`;

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
}