import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetAllProductsResponse } from '../../../../models/interfaces/products/response/GetAllProductsResponse';
import { ProductEvent } from '../../../../models/enums/products/ProductEvent';
import { EventAction } from '../../../../models/interfaces/products/event/EventAction';
import { DeleteProductAction } from '../../../../models/interfaces/products/event/DeleteProductAction';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
})
export class ProductsTableComponent {
  @Input() products:Array<GetAllProductsResponse> = []
  @Output() productEvent  = new EventEmitter<EventAction>()
  @Output() deleteProductEvent  =  new EventEmitter<DeleteProductAction>()
  public productSelected!:  GetAllProductsResponse
  public addProductEvent =  ProductEvent.ADD_PRODUCT_EVENT
  public editProductEvent = ProductEvent.EDIT_PRODUCT_EVENT



  handleProductEvent(action:string, id?:string):void{
    if (action  && action !== '') {
      const productEventData = id &&  id !==  '' ? {action,id} : {action}
      // EMITIR O  VALOR  DO EVENTO
      this.productEvent.emit(productEventData)
    }
  }

  handleDeleteProduct(product_id:string,productName:string):void{
      if (product_id  !== '' &&  productName  !== '') {
        this.deleteProductEvent.emit({
          product_id,
          productName
        })
      }
  }
}
