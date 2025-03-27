import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDetailsUpdateDialogComponent } from '../userDetailsUpdateDialog/user-details-update-dialog/user-details-update-dialog.component';
import { FoodItemsService } from '../../services/foodItems/food-items.service';

@Component({
  selector: 'app-food-item-update-dialog',
  templateUrl: './food-item-update-dialog.component.html',
  styleUrl: './food-item-update-dialog.component.css',
  standalone: false,
})
export class FoodItemUpdateDialogComponent {
  itemUpdateForm: FormGroup;
  showPassword = false;
  data: { id: number } = inject(MAT_DIALOG_DATA);
  selectedImage: File | null = null;
  imageByteArray: any;
  constructor(
    private fb: FormBuilder,
    private foodItemService: FoodItemsService,
    private dialogRef: MatDialogRef<UserDetailsUpdateDialogComponent>
  ) {
    this.itemUpdateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      price: [
        '',
        [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')],
      ],
      image: ['', [Validators.required]],
      restaurantId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      active: [false, [Validators.required]],
    });
  }

  ngOnInit() {
    console.log(this.data);
    this.foodItemService.getFoodItemById(this.data.id).subscribe((foodItem) => {
      console.log(foodItem);
      const { image, ...foodItemWithoutImage } = foodItem.data;
      this.itemUpdateForm.patchValue(foodItemWithoutImage);
      console.log(this.itemUpdateForm.value);
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;

    if (!fileInput.files || fileInput.files.length === 0) {
      this.selectedImage = null;
      return;
    }

    this.selectedImage = fileInput.files.item(0);

    if (this.selectedImage) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        this.itemUpdateForm.value.image = base64String;
        console.log('Base64 Image (without prefix):', base64String);
      };

      reader.readAsDataURL(this.selectedImage);
    }
  }

  onSubmit() {
    if (this.itemUpdateForm.valid) {
      console.log('Form Submitted', this.itemUpdateForm.value);
      this.foodItemService
        .updateFoodItem(this.data.id, this.itemUpdateForm.value)
        .subscribe(
          (response) => {
            console.log(response);
            if (response.status === 200) {
              this.dialogRef.close();
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}
