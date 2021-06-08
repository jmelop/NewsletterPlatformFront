import { Injectable } from '@angular/core';
import { Tag } from '../../models/admin/tag.model';
import axios from 'axios';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

const apiUrl = `${environment.apiUrl}tags/`


@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private cookieService: CookieService) { }

  token = this.cookieService.get('token_access');

  options = {
    headers: {
      'Authorization': this.token
    }
  }

  getAllTags(): Promise<Tag[]> {
    return axios.get(apiUrl, this.options)
      .then(rest => rest.data)
  }

  postTag(tag: Tag) {
    return axios.post(apiUrl, tag, this.options)
      .then(res => {
        return res.data;
      }).catch((err) => console.log(err))
  }

  deleteTag(id: string) {
    return axios.delete(apiUrl + id, this.options)
      .then(() => {
        return 'OK'
      })
  }

  updateTag(id: string, tag: Tag): Promise<Tag[]> {
    return axios.patch(apiUrl + id + '/', tag, this.options)
      .then(res => {
        return res.data;
      })
  }
}
