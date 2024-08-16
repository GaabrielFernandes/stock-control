import { DeleteProductAction } from './../../../../models/interfaces/products/event/DeleteProductAction';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from '../../../../Services/products/products.service';
import { ProductsDataTransferService } from '../../../../sherad/services/products/products-data-transfer.service';
import { Router } from '@angular/router';
import { GetAllProductsResponse } from '../../../../models/interfaces/products/response/GetAllProductsResponse';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EventAction } from '../../../../models/interfaces/products/event/EventAction';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductFormComponent } from '../../components/product-form/product-form.component';


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
      private messageService: MessageService,
      private confirmationService:ConfirmationService,
      private dialogService:DialogService,
      private ref: DynamicDialogRef
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
          life:2500,
        })
        this.router.navigate(['/dashboard'])
      }
    })
  }

  handleProductAction(event: EventAction):void{
    if(event){
      this.ref  = this.dialogService.open(ProductFormComponent,{
        header:event.action,
        width:'70%',
        contentStyle:{overflow:'auto'},
        baseZIndex:10000,
        maximizable:true,
        data:{
          event:event,
          productsDatas:  this.productsDatas
        }
      })
      this.ref.onClose
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:() =>  this.getAPIProductsDatas()

      })
    }
  }
  handleDeleteProductAction(event:{product_id:string,productName:string}):void{
    if (event) {
      this.confirmationService.confirm({
        message:`Confirma  a exclusão do  produto:  ${event.productName}`,
        header:'Confirmação de  exclusão',
        icon:'pi pi-exclamation-triangle',
        acceptLabel:'Sim',
        rejectLabel:'Não',
        accept:()=> this.deleteProduct(event.product_id)
      })
    }
  }
  deleteProduct(product_id: string) {
    if(product_id){
      this.productsService.deleteProduct(product_id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:(response) =>{
          if (response) {
            this.messageService.add({
              severity:'success',
              summary:'Sucesso',
              detail:'Produto removido  com sucesso',
              life:2500
            })
            this.getAPIProductsDatas()
          }
        },error:(err) =>{
          console.log(err)
          this.messageService.add({
            severity:'error',
            summary:'ERRO',
            detail:'Erro ao  remover  produto',
            life:2500
          })
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete
  }

}
