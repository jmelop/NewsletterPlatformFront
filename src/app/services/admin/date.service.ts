import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import axios from 'axios';

const apiUrl = `${environment.apiUrl}senddate/`

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(private cookieService: CookieService) { }

  token = this.cookieService.get('token_access');

  options = {
    headers: {
      'Authorization': this.token
    }
  }

  getAllDates() {
    return axios.get(apiUrl, this.options)
      .then(rest => { 
        return rest.data
      })
  }


}
