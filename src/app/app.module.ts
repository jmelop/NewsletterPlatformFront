import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewsComponent } from './news/news.component';
import { TagsComponent } from './tags/tags.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import {RegisterComponent} from './components/register/register.component';
import { HomeUserComponent } from './components/home-user/home-user.component';



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
    HomeUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
