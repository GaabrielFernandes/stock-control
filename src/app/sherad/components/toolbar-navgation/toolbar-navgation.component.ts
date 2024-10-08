import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductFormComponent } from '../../../modules/products/components/product-form/product-form.component';
import { ProductEvent } from '../../../models/enums/products/ProductEvent';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-toolbar-navgation',
  templateUrl: './toolbar-navgation.component.html',
})
export class ToolbarNavgationComponent {

  constructor(private cookie: CookieService, private router: Router, private dialogService:DialogService){}

  handleLogout():void{
    this.cookie.delete('USER_INFO');
    void this.router.navigate(['/home'])
  }

  handleSaleProduct() {
    const saleProductAction = ProductEvent.SALE_PRODUCT_EVENT

    this.dialogService.open(ProductFormComponent,{
      header:saleProductAction,
      width:'70%',
      contentStyle:{overflow:'auto'},
      baseZIndex:10000,
      maximizable:true,
      data:{
        event:{action:saleProductAction}
      }
    })
    }
}
