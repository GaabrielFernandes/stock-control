import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CreateProductRequest } from './../../../../models/interfaces/products/request/CreateProductRequest';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesService } from '../../../../Services/categories/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { GetCategoriesResponse } from '../../../../models/interfaces/categories/responses/GetCategoriesResponse';
import { ProductsService } from '../../../../Services/products/products.service';
import { EventAction } from '../../../../models/interfaces/products/event/EventAction';
import { GetAllProductsResponse } from '../../../../models/interfaces/products/response/GetAllProductsResponse';
import { ProductsDataTransferService } from '../../../../sherad/services/products/products-data-transfer.service';
import { response } from 'express';
import { ThisReceiver } from '@angular/compiler';
import { ProductEvent } from '../../../../models/enums/products/ProductEvent';
import { EditProductRequest } from '../../../../models/interfaces/products/response/EditProductRequest';
import { SaleProductsRequest } from '../../../../models/interfaces/products/request/SaleProductsRequest';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit,  OnDestroy {

  private readonly destroy$:Subject<void> =  new Subject()
  public categoriesDatas:Array<GetCategoriesResponse> = []
  public productsDatas:Array<GetAllProductsResponse> =  []
  public selectedCategory:Array<{name:string; code:string}>  = []
  public productSelectedDatas!:GetAllProductsResponse
  public rederDropdown = false
  public addProductAction = ProductEvent.ADD_PRODUCT_EVENT
  public editProductAction = ProductEvent.EDIT_PRODUCT_EVENT
  public saleProductAction = ProductEvent.SALE_PRODUCT_EVENT
  public  productAction!:{
    event: EventAction
    productDatas:Array<GetAllProductsResponse>,
    product: any
  }
  public addProductForm:FormGroup
  public editProductForm:FormGroup
  public saleProductForm:FormGroup
  public saleProductSelected!:GetAllProductsResponse;


  constructor(
    private categoriesService:CategoriesService,
    private formBuilder:FormBuilder,
    private productsService:ProductsService,
    private productDtService:ProductsDataTransferService,
    private messageService:  MessageService,
    private router:Router,
    public ref: DynamicDialogConfig
  ){
    this.addProductForm = this.formBuilder.group({
      name:['',Validators.required],
      price:['',Validators.required],
      description:['',Validators.required],
      category_id:['',Validators.required],
      amount:[0, Validators.required]
    })
    this.editProductForm = this.formBuilder.group({
      name:['',Validators.required],
      price:['',Validators.required],
      description:['',Validators.required],
      category_id:['',Validators.required],
      amount:[0,Validators.required]
    })
    this.saleProductForm = this.formBuilder.group({
      amount:[0,Validators.required],
      product_id:['',Validators.required]
    })
  }

  handleSubmitAddProduct():void {
    if (this.addProductForm.value  && this.addProductForm.valid) {
      const requestCreateProduct:CreateProductRequest  =  {
        name:this.addProductForm.value.name  as string,
        price:this.addProductForm.value.price  as  string,
        description:this.addProductForm.value.description as  string,
        category_id:this.addProductForm.value.category_id as  string,
        amount: Number(this.addProductForm.value.amount)
      }
        this.productsService.createProduct(requestCreateProduct)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next:(response)  =>{
            if (response) {
              this.messageService.add({
                severity:'success',
                summary:'Sucesso',
                detail:'Produto criado com sucesso!',
                life:2500
              })
            }
          },error:(err) =>{
            console.log(err)
            this.messageService.add({
              severity:'error',
                summary:'ERRO',
                detail:'Erro ao  criar  produto!',
                life:2500
            })
          }
        })
    }
    this.addProductForm.reset()

  }

  handleSubmitEditProduct():void{
    console.log('chegou para  editar')
    if(this.editProductForm.value  &&
      this.editProductForm.valid   &&
      this.productAction.event.id
    ){
      const  requestEditProduct:EditProductRequest  = {
        name:this.editProductForm.value.name as  string,
        price:this.editProductForm.value.price as  string,
        description:this.editProductForm.value.description as string,
        product_id:this.productAction.event.id,
        amount:this.editProductForm.value.amount as number,
        category_id:this.editProductForm.value.category_id as  string
      }

      this.productsService
      .editProduct(requestEditProduct)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:() =>{
          this.messageService.add({
            severity:'success',
            summary:'Sucesso',
            detail:'Produto editado com sucesso',
            life:2500
          })
          this.editProductForm.reset()
        },error:(err) =>{
          console.log(err)
          this.messageService.add({
            severity:'error',
            summary:'ERRO',
            detail:'Erro ao editar  produto',
            life:2500
          })
          this.editProductForm.reset()
        }
      })
    }
  }

  getProductSelectedDatas(productId:string):void{
    const allProducts = this.productAction?.productDatas


    if(allProducts.length > 0){
      const productFiltered = allProducts.filter((element)=>element?.id === productId)
      if(productFiltered){
        this.productSelectedDatas = productFiltered[0]

        this.editProductForm.setValue({
          name:this.productSelectedDatas?.name,
          price:this.productSelectedDatas?.price,
          amount:this.productSelectedDatas?.amount,
          description:this.productSelectedDatas?.description,
          category_id:this.productSelectedDatas.category.id
        })
      }
    }
  }

  getProductDatas():void{
    this.productsService.getAllProducts()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(response)=>{
        if(response.length > 0){
          this.productsDatas =  response
          this.productsDatas && this.productDtService.setProductsDatas(this.productsDatas)
        }
      }
    })
  }

  handleSubmitSaleProduct() {
    console.log('Chamou')
      if (this.saleProductForm.value && this.saleProductForm.valid){
        const requestDatas:SaleProductsRequest  = {
          amount:this.saleProductForm.value.amount as number,
          product_id:this.saleProductForm.value.product_id as string
        }

        this.productsService.saleProduct(requestDatas)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next:(response)=>{
            if (response) {
              this.saleProductForm.reset()
              this.getProductDatas()
              this.messageService.add({
                severity:'success',
                summary:'Sucesso',
                detail:'Venda efetuada com  sucesso',
                life:2500
              })
              this.router.navigate(['/dashboard'])
            }
          },error:(err) => {
            console.log(err)
            this.saleProductForm.reset()
            this.messageService.add({
              severity:'error',
              summary:'ERRO',
              detail:'Erro ao vender',
              life:2500
            })
          },
        })
      }
  }

  ngOnInit(): void {
    console.log('esta editando')
    this.productAction = this.ref.data

    this.productAction.event.action === this.saleProductAction &&
    this.getProductDatas()

    this.getAllCategories()
    this.rederDropdown  =  true

    console.log(this.productAction)
    if(this.productAction.product){
      console.log('esta editando')
      this.editProductForm.setValue({
        name:this.productAction.product.name,
        price:this.productAction.product.price,
        amount:this.productAction.product.amount,
        description:this.productAction.product.description,
        category_id: this.productAction.product
      })
    }

  }


  getAllCategories() {
    this.categoriesService.getAllCategories()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(response)=>{
        if (response.length >  0) {
          this.categoriesDatas = response
          if(this.productAction.event.action === this.editProductAction && this.productAction.productDatas){
            this.getProductSelectedDatas(this.productAction.event.id as string)
          }
        }
      }
    })
  }

  ngOnDestroy(): void {
   this.destroy$.next()
   this.destroy$.complete()
  }

}
