import { Injectable } from '@angular/core';
import { New } from '../../models/admin/new.model';
import axios from 'axios';
import { config } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

const apiUrl = `${environment.apiUrl}news/`

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private cookieService: CookieService) { }

  token = this.cookieService.get('token_access');

  options = {
    headers: {
      'Authorization': this.token
    }
  }
  getAllNews(id: string): Promise<New[]> {
    return axios.get(apiUrl+'owner/'+id, this.options)
      .then(rest => rest.data)
  }

  postNew(newNotice: New) {
    return axios.post(apiUrl, newNotice, this.options)
      .then(res => {
        return res.data;
      }).catch((err) => console.log(err))
  }

  deleteNew(id: string) {
    return axios.delete(apiUrl + id, this.options)
      .then(() => {
        return 'OK'
      })
  }

  updateNew(id: string, news: New): Promise<New[]> {
    return axios.patch(apiUrl + id + '/', news, this.options)
      .then(res => {
        return res.data;
      })
  }
}
