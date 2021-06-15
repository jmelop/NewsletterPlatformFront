import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/admin/users/users.component';
import { NavbarComponent } from './components/admin/navbar/navbar.component';
import { NewsComponent } from './components/admin/news/news.component';
import { TagsComponent } from './components/admin/tags/tags.component';
import { LoginComponent } from './components/landing/login/login.component';
import { MainComponent } from './components/landing/main/main.component';
import { ChartsModule } from 'ng2-charts';
import { ReportsComponent } from './components/admin/reports/reports.component';
import { LandingComponent } from './components/landing/landing/landing.component';
import { HomeUserComponent } from '../app/components/user/home-user/home-user.component';
import { UserProfileComponent } from '../app/components/user/user-profile/user-profile.component';
import { UserTagsComponent } from '../app/components/user/user-tags/user-tags.component';
import { UserNavbarComponent } from '../app/components/user/user-navbar/user-navbar.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { RegisterUserComponent } from './components/landing/register-user/register-user.component';
import { RegisterAdminComponent } from './components/landing/register-admin/register.component';
import { LoginUserComponent } from './components/landing/login-user/login-user.component';
import { HomeComponent } from './components/admin/home/home.component';
import { RecoverPasswordComponent } from './components/landing/recover-password/recover-password.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavbarComponent,
    NewsComponent,
    TagsComponent,
    LoginComponent,
    MainComponent,
    RegisterAdminComponent,
    ReportsComponent,
    LandingComponent,
    HomeUserComponent,
    UserProfileComponent,
    UserTagsComponent,
    UserNavbarComponent,
    RegisterUserComponent,
    LoginUserComponent,
    HomeComponent,
    RecoverPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    CKEditorModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
