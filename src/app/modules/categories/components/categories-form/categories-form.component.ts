import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { pipe, Subject, takeUntil } from 'rxjs';
import { CategoriesService } from '../../../../Services/categories/categories.service';
import { CategoriEvent } from '../../../../models/enums/categories/CategoriEvent';
import { EditCategoryAction } from '../../../../models/interfaces/categories/event/EditCategoryAction';
import { response } from 'express';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
  private readonly  destroy$:  Subject<void> = new Subject()
  public addCategoryAction = CategoriEvent.ADD_CATEGORY_ACTION
  public editCategoryAction =  CategoriEvent.EDIT_CATEGORI_ACTION
  public categoryAction!: {event:EditCategoryAction}
  public categoryForm:FormGroup


  constructor(
    public ref:DynamicDialogConfig,
    private formBuilder:FormBuilder,
    private messageService:MessageService,
    private categoriesService:CategoriesService
  ){

    this.categoryForm = this.formBuilder.group({
      name:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.categoryAction = this.ref.data

    if (
      this.categoryAction.event.action  === this.editCategoryAction &&
      this.categoryAction.event.category_name !== null || undefined
    ) {
      this.setCategoryName(this.categoryAction.event.category_name as string)
    }
  }

  handleSubmitAddCategory():void{
    if (this.categoryForm.value &&  this.categoryForm.valid){
      const requestCreateCategory:{name:string}  ={
        name:this.categoryForm.value.name as string
      }

      this.categoriesService.createNewCategory(requestCreateCategory)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:(response) =>{
          if(response){
              this.categoryForm.reset()
              this.messageService.add({
                severity:'success',
                summary:'Sucesso',
                detail:'Categoria criada  com sucesso!',
                life:3000
              })
          }
        },
        error:(err)=>{
          console.log(err)
          this.categoryForm.reset()
          this.messageService.add({
            severity:'error',
            summary:'ERRO',
            detail:'Erro ao criar categoria!',
            life:3000
          })
        }
      })
    }
  }

  handleSubmitCategoryAction():void{
    console.log('Esta chamando')
   if (this.categoryAction.event.action === this.addCategoryAction) {
    this.handleSubmitAddCategory()
   }else if(this.categoryAction.event.action === this.editCategoryAction){
    this.handleSubmitEditCategory()
   }
  }

  handleSubmitEditCategory():void{
    if(
      this.categoryForm.value &&
      this.categoryForm.valid &&
      this.categoryAction.event.id
    ){
      const requestEditCategory:{name:string; category_id:string} = {
        name:this.categoryForm.value.name as string,
        category_id:this.categoryAction.event.id
      }
      this.categoriesService
      .editCategoryName(requestEditCategory)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:()=>{
          this.categoryForm.reset()
          this.messageService.add({
            severity:'success',
            summary:'Sucesso',
            detail:'Categoria editada com sucesso',
            life:3000
          })
        },error:(err) =>{
          console.log(err)
          this.categoryForm.reset()
          this.messageService.add({
            severity:'error',
            summary:'ERRO',
            detail:'Erro ao editar  categoria',
            life:3000
          })
        }
      })
    }
  }

  setCategoryName(categoryName:string):void{
    if(categoryName){
      this.categoryForm.setValue({
        name:categoryName
      })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
