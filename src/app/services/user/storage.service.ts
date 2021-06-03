import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from 'src/app/models/users/session.model';
import { User } from 'src/app/models/users/user.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private localStorageService;
  private currentSession : Session = null;

  constructor(private router: Router) { 
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  loadSessionData(): Session {
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
  }

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  }

  getCurrentToken():string {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  }

  getCurrentSession(): Session {
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
    var session: Session = this.currentSession;
    return (session && session.user) ? session.user : null;
  }

}
