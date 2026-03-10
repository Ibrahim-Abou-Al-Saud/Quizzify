import { Injectable } from '@angular/core';

const USER = 'q_user';

@Injectable({
  providedIn: 'root',
})
export class UserStorage {
  constructor() {}

  static saveUser(user: any): void {
    localStorage.removeItem(USER);
    localStorage.setItem(USER, JSON.stringify(user));
  }

  static getUser(): any {
    return JSON.parse(localStorage.getItem(USER) || '{}');
  }

  static getUserId(): string {
    const user = this.getUser();
    if (user == null || user.id == null) {
      return '';
    }
    return user.id;
  }

  static getUserRole(): string {
    const user = this.getUser();
    if (user == null || user.role == null) {
      return '';
    }
    return user.role;
  }

  static isAdminLoggedIn(): boolean {
    const user = this.getUser();
    return user != null && user.role === 'ADMIN';
  }

  static isUserLoggedIn(): boolean {
    const user = this.getUser();
    return user != null && user.role === 'USER';
  }

  static signOut(): void {
    localStorage.removeItem(USER);
  }
}
