import { Injectable } from '@angular/core';
import axios from 'axios';
import { Tag } from 'src/app/models/tags.model';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  apiUrl = "http://localhost:4000/tags";

  constructor() { }

  getAlltags(): Promise<Tag[]> {
    return axios.get(this.apiUrl)
    .then(res => res.data)
  }
}
