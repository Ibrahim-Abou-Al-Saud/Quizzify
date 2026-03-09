import { Component, OnInit } from '@angular/core';
import { UserStorage } from '../../../core/services/user-storage';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  isAdminLoggedIn: boolean = UserStorage.isAdminLoggedIn();
  links : Link[] = [];
  adminOrUser : string = this.isAdminLoggedIn ? 'admin' : 'user';

  constructor(private route: Router, private toast: ToastrService) {}

  ngOnInit(): void {
    this.route.events.subscribe(() => {
      this.isAdminLoggedIn = UserStorage.isAdminLoggedIn();
    });
      this.links = [
        {name: 'Dashboard', path: `/layout/${this.adminOrUser}/dashboard`},
        {name: 'Results', path: `/layout/${this.adminOrUser}/view-results`},
      ];
  }

  logout() {
    UserStorage.signOut();
    this.toast.success('Logged out successfully!', 'Success', {
      timeOut: 3000,
      positionClass: 'toast-top-center',
    });
    this.route.navigate(['/login']);
  }
}
