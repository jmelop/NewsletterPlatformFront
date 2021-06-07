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
import { RegisterComponent } from './components/landing/register/register.component';
import { ChartsModule } from 'ng2-charts';
import { ReportsComponent } from './components/admin/reports/reports.component';
import { LandingComponent } from './components/landing/landing/landing.component';
import { HomeUserComponent } from '../app/components/user/home-user/home-user.component';
import { UserProfileComponent } from '../app/components/user/user-profile/user-profile.component';
import { UserTagsComponent } from '../app/components/user/user-tags/user-tags.component';
import { UserNavbarComponent } from '../app/components/user/user-navbar/user-navbar.component';
import { CKEditorModule } from 'ng2-ckeditor';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavbarComponent,
    NewsComponent,
    TagsComponent,
    LoginComponent,
    MainComponent,
    RegisterComponent,
    ReportsComponent,
    LandingComponent,
    HomeUserComponent,
    UserProfileComponent,
    UserTagsComponent,
    UserNavbarComponent
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
