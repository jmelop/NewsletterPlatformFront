import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/user/authentication.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

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
      this.authenticationService.recoverPasswordUser(this.token, this.password)
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
