import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { FoodItemsComponent } from './food-items/food-items.component';
import { UsersComponent } from './users/users.component';
import { IonicModule } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AdminComponent, FoodItemsComponent, UsersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatGridListModule,
    MatGridTile,
    MatListModule,
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatCardModule,
    MatCardActions,
    MatListModule,
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    IonicModule.forRoot(),
  ],
  bootstrap: [AdminComponent],
})
export class AdminModule {}
