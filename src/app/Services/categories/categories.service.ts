import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { GetCategoriesResponse } from '../../models/interfaces/categories/responses/GetCategoriesResponse';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private API_URL = environment.API_URL
  private JWT_TOKEN:string
  private httpOptions

  constructor(
    private http: HttpClient,
    private cookie:CookieService
  ) {
    this.JWT_TOKEN  = this.cookie.get('USER_INFO')
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`Bearer ${this.JWT_TOKEN}`
      })
    }
  }

  getAllCategories():Observable<Array<GetCategoriesResponse>>{
    return this.http.get<Array<GetCategoriesResponse>>(
      `${this.API_URL}/categories`,
       this.httpOptions
    )
  }
}
