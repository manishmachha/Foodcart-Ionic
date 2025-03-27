import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  standalone: false,
})
export class AdminComponent {
  constructor(private authService: AuthService, private router: Router) {}

  // ngOnInit(): void {
  //   if (!this.authService.isAuthenticated()) {
  //     this.router.navigate(['/login']);
  //   }
  // }

  navigateToUsers() {
    this.router.navigate(['/admin/users']); // Change '/users' to your target route
  }

  navigateToRestaurants() {
    this.router.navigate(['/admin/restaurants']); // Change '/users' to your target route
  }

  navigateToFoodItems() {
    this.router.navigate(['/admin/food-items']); // Change '/users' to your target route
  }

  navigateToAddresses() {
    this.router.navigate(['/admin/addresses']); // Change '/users' to your target route
  }

  navigateToBills() {
    this.router.navigate(['/admin/bills']); // Change '/users' to your target route
  }

  navigateToOrders() {
    this.router.navigate(['/admin/orders']); // Change '/users' to your target route
  }
}
