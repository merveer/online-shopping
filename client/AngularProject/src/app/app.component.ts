import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchTerm = '';
  isCollapsed = true; // determine if the mobile menu expanded or collapsed whrn app is in mobile view

  constructor(private router: Router, private data: DataService) {
    this.data.getProfile();
    this.data.cartItems = this.data.getCart().length;
  }

  get token() {
    return localStorage.getItem('token'); // return login token, use later for auth
  }

  collapse() {
    this.isCollapsed = true;
  }

  closeDropdown(dropdown) {
    dropdown.close();
  }

  logout() {
    this.data.user = {};
    this.data.cartItems = 0;
    localStorage.clear();
    this.router.navigate(['']);
  }

  search() {
    if (this.searchTerm) {
      this.collapse();
      this.router.navigate(['search', { query: this.searchTerm }])
    }
  }
}
