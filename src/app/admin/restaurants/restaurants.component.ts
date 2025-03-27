import { Component } from '@angular/core';
import { RestaurantService } from '../../services/restaurant/restaurant.service';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-restaurants',
  imports: [
    MatListModule,
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.css',
})
export class RestaurantsComponent {
  restaurants: any[] = [];
  filteredRestaurants: any[] = [];
  searchTerm: string = '';
  selectedStatus: string = '';
  sortBy: string = '';
  statuses: string[] = ['true', 'false']; // Define roles here
  showSearch = false;
  showFilter = false;
  showSort = false;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe((restaurants) => {
      this.restaurants = restaurants.data;
      this.filteredRestaurants = this.restaurants;
    });
  }

  editRestaurant(id: number) {
    console.log(`Editing restaurant with ID: ${id}`);
  }

  deleteRestaurant(id: number) {
    console.log(`Deleting restaurant with ID: ${id}`);
  }

  addRestaurant() {
    this.router.navigate(['/signup']);
  }

  toggleOption(option: string) {
    if (option === 'search') {
      this.showSearch = !this.showSearch;
      this.showFilter = false;
      this.showSort = false;
    } else if (option === 'filter') {
      this.showFilter = !this.showFilter;
      this.showSearch = false;
      this.showSort = false;
    } else if (option === 'sort') {
      this.showSort = !this.showSort;
      this.showSearch = false;
      this.showFilter = false;
    }
  }

  applyFilters(): void {
    this.filteredRestaurants = this.restaurants.filter(
      (restaurant) =>
        restaurant.name
          ?.toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        restaurant.location
          ?.toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        restaurant.phoneNumber?.includes(this.searchTerm)
    );

    if (this.selectedStatus) {
      this.filteredRestaurants = this.filteredRestaurants.filter(
        (restaurant) => restaurant.status === this.selectedStatus
      );
    }

    if (
      this.sortBy &&
      this.filteredRestaurants.every((r) => r[this.sortBy] !== undefined)
    ) {
      this.filteredRestaurants.sort((a, b) => {
        const valA = a[this.sortBy]?.toString() || '';
        const valB = b[this.sortBy]?.toString() || '';
        return valA.localeCompare(valB);
      });
    }
  }
}
