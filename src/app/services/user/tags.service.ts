import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from 'src/app/models/users/user.model';
import { environment } from '../../../environments/environment';
import { Tag } from '../../models/users/tag.model';

const apiUrl =  `${environment.apiUrl}tags/`;

const options = {
  headers: {
    'Authorization': environment.token
  }
}
@Injectable({
  providedIn: 'root'
})
export class TagsService {


  constructor() { }

  getAlltags(): Promise<Tag[]> {
    return axios.get(apiUrl, options)
      .then(res => res.data)
  }
}
