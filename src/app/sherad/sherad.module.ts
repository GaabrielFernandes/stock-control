import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { DialogService } from 'primeng/dynamicdialog';
import { ToolbarNavgationComponent } from './components/toolbar-navgation/toolbar-navgation.component';
import { ButtonModule } from 'primeng/button';
import { ShortesPipe } from './pipes/shortes/shortes.pipe';



@NgModule({
  declarations: [
    ToolbarNavgationComponent,
    ShortesPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    //PrimeNg
    ToolbarModule,
    CardModule,
    ToolbarModule,
    ButtonModule
  ],
  exports:[ToolbarNavgationComponent, ShortesPipe],
  providers:[DialogService, CurrencyPipe]
})
export class SheradModule { }
