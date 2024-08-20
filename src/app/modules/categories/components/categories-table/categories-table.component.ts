import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GetCategoriesResponse } from '../../../../models/interfaces/categories/responses/GetCategoriesResponse';
import { EditCategoryAction } from '../../../../models/interfaces/categories/event/EditCategoryAction';
import { CategoriEvent } from '../../../..//models/enums/categories/CategoriEvent';
import { DeleteCategoryAction } from '../../../../models/interfaces/categories/event/DeleteCategoryAction';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
})
export class CategoriesTableComponent implements OnInit {
  @Input()  public categories:Array<GetCategoriesResponse> =  []
  @Output() public categoryEvent = new  EventEmitter<EditCategoryAction>()
  @Output()  public  deleteCategoryEvent = new EventEmitter<DeleteCategoryAction>()
  public categorySelected!: GetCategoriesResponse
  public addCategoryAction = CategoriEvent.ADD_CATEGORY_ACTION
  public editCategoryAction = CategoriEvent.EDIT_CATEGORI_ACTION


  handleDeleteCategoryEvent(category_id:string,categoryName:String){
    if (category_id !== '' && categoryName  !== '') {
      this.deleteCategoryEvent.emit({
        category_id,
        categoryName
      })
    }


  }

  handleCategoryEvent(action:string, id?:string, category_name?:string):void{
      if (action &&  action !== '') {
        this.categoryEvent.emit({action,id,category_name})
      }
  }

  constructor() { }

  ngOnInit() {
  }

}
