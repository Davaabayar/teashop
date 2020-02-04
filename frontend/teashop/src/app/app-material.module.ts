import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatMenuModule,
  MatIconModule,
  MatTabsModule,
  MatSelectModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatListModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatStepperModule,
} from "@angular/material";

const modules = [
  CommonModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatSelectModule,
  MatCheckboxModule,
  MatMenuModule,
  MatIconModule,
  MatTabsModule,
  MatSidenavModule,
  MatListModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatStepperModule
];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules]
})
export class MaterialModule { }
