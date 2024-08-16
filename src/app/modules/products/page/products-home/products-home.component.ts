import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from '../../../../Services/products/products.service';
import { ProductsDataTransferService } from '../../../../sherad/services/products/products-data-transfer.service';
import { Router } from '@angular/router';
import { GetAllProductsResponse } from '../../../../models/interfaces/products/response/GetAllProductsResponse';
import { response } from 'express';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
})
export class ProductsHomeComponent implements OnDestroy,  OnInit {
    private readonly  destroy$: Subject<void>  =  new  Subject()
    public productsDatas:Array<GetAllProductsResponse> = []

    constructor(
      private  productsService:ProductsService,
      private  productsDtService:ProductsDataTransferService,
      private  router:Router,
      private messageService: MessageService
    ){}
  ngOnInit(): void {
    this.getServiceProductsDatas()
  }
  getServiceProductsDatas() {
    const productsLoaded = this.productsDtService.getProductsDatas()
    if (productsLoaded.length > 0) {
      this.productsDatas  = productsLoaded
    }else this.getAPIProductsDatas()

    console.log('DADOS DOS PRODUTOS',this.productsDatas)
  }
  getAPIProductsDatas() {
    this.productsService
    .getAllProducts()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(response) =>{
        if (response.length > 0) {
          this.productsDatas =  response
        }
      },
      error:(err)=>{
        console.log(err)
        this.messageService.add({
          severity:'error',
          summary:'ERRO',
          detail:'Erro ao buscar produto',
          life:2500
        })
        this.router.navigate(['/dashboard'])
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete
  }

}
