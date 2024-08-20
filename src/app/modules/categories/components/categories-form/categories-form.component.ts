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

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
