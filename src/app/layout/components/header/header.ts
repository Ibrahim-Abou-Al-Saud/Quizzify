import { Component, OnInit } from '@angular/core';
import { UserStorage } from '../../../core/services/user-storage';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

interface Link {
  name: string;
  path: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  isUserLoggedIn: boolean = UserStorage.isUserLoggedIn();
  isAdminLoggedIn: boolean = UserStorage.isAdminLoggedIn();
  links : Link[] = [];

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.route.events.subscribe(() => {
      this.isUserLoggedIn = UserStorage.isUserLoggedIn();
      this.isAdminLoggedIn = UserStorage.isAdminLoggedIn();
    });
    if(this.isAdminLoggedIn) {
      this.links = [
        {name: 'Dashboard', path: '/layout/admin/dashboard'},
        {name: 'Create Test', path: '/layout/admin/tests'},
        {name: 'Results', path: '/layout/admin/results'},
      ];
    } else {
      this.links = [
        {name: 'Dashboard', path: '/layout/user/dashboard'},
        {name: 'Results', path: '/layout/user/results'},
      ];
    }
  }

  logout() {
    UserStorage.signOut();
    this.route.navigate(['/login']);
  }
}
