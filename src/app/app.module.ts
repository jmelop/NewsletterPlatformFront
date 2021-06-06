import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/admin/users/users.component';
import { NavbarComponent } from './components/admin/navbar/navbar.component';
import { NewsComponent } from './components/admin/news/news.component';
import { TagsComponent } from './components/admin/tags/tags.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import {RegisterComponent} from './components/register/register.component';
import { ChartsModule } from 'ng2-charts';
import { ReportsComponent } from './components/admin/reports/reports.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LandingComponent } from './components/landing/landing/landing.component';


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
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
