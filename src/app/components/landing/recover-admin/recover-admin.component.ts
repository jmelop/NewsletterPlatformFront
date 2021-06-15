import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-recover-admin',
  templateUrl: './recover-admin.component.html',
  styleUrls: ['./recover-admin.component.css']
})
export class RecoverAdminComponent implements OnInit {

  token: string;
  password: string;
  confirmPassword: string;
  successMessage: string;
  errorMessage: string;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    let url= this.router.parseUrl(this.router.url);
    this.token = url.toString().substr(url.toString().lastIndexOf('/') + 1);
  }


  recoverPassword() {
    if (this.password === this.confirmPassword) {
      this.authenticationService.recoverPasswordAdmin(this.token, this.password)
      .then(res => {
        this.successMessage = 'La contraseña ha sido cambiada';
        this.password = '';
        this.confirmPassword = '';
      })
      .catch(err => {
        throw err
      })
    }
    else {
      this.errorMessage = 'Las contraseñas no coinciden'
    }
  }


}
