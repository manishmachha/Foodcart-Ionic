import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FoodItemsService } from '../../services/foodItems/food-items.service';
import { FoodItemUpdateDialogComponent } from '../../utils/food-item-update-dialog/food-item-update-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../utils/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-food-items',
  templateUrl: './food-items.component.html',
  styleUrl: './food-items.component.css',
  standalone: false,
})
export class FoodItemsComponent {
  foodItems: any[] = [];
  filteredFoodItems: any[] = [];
  searchTerm: string = '';
  selectedStatus: string = '';
  sortBy: string = '';
  statuses: string[] = ['true', 'false']; // Active status options
  showSearch = false;
  showFilter = false;
  showSort = false;

  constructor(
    private foodItemService: FoodItemsService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.foodItemService.getFoodItems().subscribe((foodItems) => {
      this.foodItems = foodItems.data.map(this.convertImage);
      this.filteredFoodItems = this.foodItems;
    });
  }

  editFoodItem(id: number) {
    this.dialog
      .open(FoodItemUpdateDialogComponent, {
        width: '1000px',
        data: {
          id: id,
        },
      })
      .afterClosed()
      .subscribe(() => this.ngOnInit());
  }

  updateFoodItem(id: number) {
    let item = this.foodItems.find((item) => item.id === id);
    item.image = item.image.slice(22);
    console.log(item);
    if (item.active) {
      item.active = false;
    } else {
      item.active = true;
    }
    // console.log(user);
    this.foodItemService.updateFoodItem(id, item).subscribe((res) => {
      console.log(res.message);
      this.ngOnInit();
    });
  }

  deleteFoodItem(id: number) {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: {
          title: 'Are you sure',
          content: `You Want to delete item #${id}?`,
          btn1: 'Yes',
          btn2: 'No',
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.foodItemService.deleteFoodItem(id).subscribe((res) => {
            console.log(res.message);
            this.ngOnInit();
          });
        }
      });
  }

  addFoodItem() {
    this.router.navigate(['/add-food-item']);
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
    this.filteredFoodItems = this.foodItems.filter(
      (foodItem) =>
        foodItem.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        foodItem.restaurantName
          ?.toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        foodItem.price?.toString().includes(this.searchTerm)
    );

    if (this.selectedStatus) {
      this.filteredFoodItems = this.filteredFoodItems.filter(
        (foodItem) => foodItem.isActive.toString() === this.selectedStatus
      );
    }

    if (
      this.sortBy &&
      this.filteredFoodItems.every((item) => item[this.sortBy] !== undefined)
    ) {
      this.filteredFoodItems.sort((a, b) => {
        const valA = a[this.sortBy]?.toString() || '';
        const valB = b[this.sortBy]?.toString() || '';
        return valA.localeCompare(valB);
      });
    }
  }

  // byte[] to image conversion
  convertImage(data: any) {
    return {
      id: data.id,
      name: data.name,
      price: data.price,
      image: 'data:image/jpg;base64,' + data.image,
      restaurantName: data.restaurantName,
      restaurantId: data.restaurantId,
      active: data.active,
    };
  }
}
