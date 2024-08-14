import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductsService } from '../../../../Services/products/products.service';
import { ProductsDataTransferService } from '../../../../sherad/services/products/products-data-transfer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
})
export class ProductsHomeComponent implements OnDestroy {
    private readonly  destroy$: Subject<void>  =  new  Subject()

    constructor(
      private  productsService:ProductsService,
      private  productsDtService:ProductsDataTransferService,
      private  router:Router
    ){}

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete
  }

}
