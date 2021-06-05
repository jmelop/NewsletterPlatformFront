import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news/news.component';
import { TagsComponent } from './tags/tags.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'tags',
    component: TagsComponent
  },
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path : 'login',
    component: LoginComponent
  },
  {
    path : 'reports',
    component: ReportsComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
