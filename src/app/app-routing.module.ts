import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './components/admin/news/news.component';
import { TagsComponent } from './components/admin/tags/tags.component';
import { UsersComponent } from './components/admin/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { ReportsComponent } from './components/admin/reports/reports.component';
import { KeeperGuard } from '../app/components/admin/keeper/keeper.guard';
import { LandingComponent } from './components/landing/landing/landing.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [KeeperGuard]

  },
  {
    path: 'news',
    component: NewsComponent,
    canActivate: [KeeperGuard]

  },
  {
    path: 'tags',
    component: TagsComponent,
    canActivate: [KeeperGuard]

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
    component: ReportsComponent,
    canActivate: [KeeperGuard]
  },
  {
    path : 'landing',
    component: LandingComponent,
    canActivate: [KeeperGuard]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
