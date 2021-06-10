import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './components/admin/news/news.component';
import { TagsComponent } from './components/admin/tags/tags.component';
import { UsersComponent } from './components/admin/users/users.component';
import { LoginComponent } from './components/landing/login/login.component';
import { MainComponent } from './components/landing/main/main.component';
import { RegisterComponent } from './components/landing/register/register.component';
import { ReportsComponent } from './components/admin/reports/reports.component';
import { KeeperGuard } from '../app/components/admin/keeper/keeper.guard';
import { LandingComponent } from './components/landing/landing/landing.component';
import { HomeUserComponent } from '../app/components/user/home-user/home-user.component';
import { UserTagsComponent } from '../app/components/user/user-tags/user-tags.component';
import { UserProfileComponent } from '../app/components/user/user-profile/user-profile.component';
import { HomeComponent } from './components/admin/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [KeeperGuard]

  },
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
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home-user',
    component: HomeUserComponent,
    canActivate: [KeeperGuard]
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [KeeperGuard]
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'user-tags',
    component: UserTagsComponent,
    canActivate: [KeeperGuard]
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [KeeperGuard]

  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
