import { NgModule } from '@angular/core';

import {

  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatExpansionModule,
  MatTabsModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatRadioModule,
  MatSelectModule,
  MatTableModule,
  MatChipsModule,
  MatSlideToggleModule,
  MatStepperModule,
  MatDialogModule,
  MatSidenavModule,
  
} from '@angular/material';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const MaterialComponents = [

  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatExpansionModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatTabsModule,
  MatDividerModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatRadioModule,
  MatSelectModule,
  MatTableModule,
  DragDropModule,
  ReactiveFormsModule,
  FormsModule,
  MatChipsModule,
  MatSlideToggleModule,
  MatStepperModule,
  MatDialogModule,
  MatSidenavModule,
  
]

@NgModule({
  imports: [
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModule {}