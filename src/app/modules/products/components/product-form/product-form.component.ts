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
  public  productAction!:{
    event: EventAction
    productDatas:Array<GetAllProductsResponse>
  }
  addProductForm:FormGroup
  editProductForm:FormGroup


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
    // if(this.editProductForm.value  &&  this.editProduct.valid){
    // }
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

  ngOnInit(): void {
    this.productAction = this.ref.data
    this.getAllCategories()
  }
  getAllCategories() {
    this.categoriesService.getAllCategories()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(response)=>{
        if (response.length >  0) {
          this.categoriesDatas = response
        }
      }
    })
  }

  ngOnDestroy(): void {
   this.destroy$.next()
   this.destroy$.complete()
  }

}
