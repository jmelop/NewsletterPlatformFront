import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/user/authentication.service';
import { Admin } from 'src/app/models/admin/admin.model';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterAdminComponent implements OnInit {

  newAdmin: Admin = {name: '', username: '', email: '', password: ''};

  errorMessage: string;

  constructor(
    private authenticationService: AuthenticationService, 
    private router: Router, 
  ) { 
  }

  ngOnInit(): void {
  }

  register() {
    this.authenticationService.registerAdmin(this.newAdmin)
        .then(res => {
          this.newAdmin.username = '';
          this.newAdmin.email = '';
          this.newAdmin.password = '';
          this.router.navigate(['login'])
        })
      .catch(err  => {
        this.errorMessage = err.response.data
    });
  }
}
