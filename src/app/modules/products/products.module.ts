import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SheradModule } from '../../sherad/sherad.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';
import { ProductsHomeComponent } from './page/products-home/products-home.component';
import { RouterModule } from '@angular/router';
import { PRODUCTS_ROUTES } from './products.route';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { DialogModule } from 'primeng/dialog';



@NgModule({
  declarations: [
    ProductsHomeComponent,
    ProductsTableComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(PRODUCTS_ROUTES),
    SheradModule,
    HttpClientModule,
    //PRIMENG
    CardModule,
    ButtonModule,
    TableModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    DynamicDialogModule,
    DropdownModule,
    ConfirmDialogModule,
    TooltipModule,
    DialogModule
  ],
  providers:[
    DialogService,
    ConfirmationService,
    DynamicDialogRef,
    DynamicDialogConfig
  ]
})
export class ProductsModule { }
