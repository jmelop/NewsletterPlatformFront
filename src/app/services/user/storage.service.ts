import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionAdmin, SessionUser } from 'src/app/models/users/session.model';
import { User } from 'src/app/models/users/user.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private localStorageService;
  private currentSession : SessionUser = null;
  private currentAdminSession : SessionAdmin = null;

  constructor(private router: Router) { 
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: SessionUser): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  setCurrentAdminSession(session: SessionAdmin): void {
    this.currentAdminSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  loadSessionData(): SessionUser {
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <SessionUser> JSON.parse(sessionStr) : null;
  }

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  }

  getCurrentToken():string {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  }

  getCurrentSession(): SessionUser {
    return this.currentSession
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  logOut(): void {
    this.removeCurrentSession();
    this.router.navigate(['login'])
  }

  getCurrentUser(): User {
    var session: SessionUser = this.currentSession;
    return (session && session.user) ? session.user : null;
  }  
}
