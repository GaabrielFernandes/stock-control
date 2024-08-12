import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SignupUserRequest } from '../../models/interfaces/User/SignupUserRequest';
import { Observable } from 'rxjs';
import { SignupUserResponse } from '../../models/interfaces/User/SignupUserResponse';
import { AuthRequest } from '../../models/interfaces/User/auth/AuthRequest';
import { AuthResponse } from '../../models/interfaces/User/auth/AuthResponse';
import { ThisReceiver } from '@angular/compiler';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private API_URL  = environment.API_URL


    constructor(private http: HttpClient, private  cookie:CookieService) { }

    signupUser(requestDatas: SignupUserRequest):Observable<SignupUserResponse>{
      return this.http.post<SignupUserResponse>(
        `${this.API_URL}/user`,requestDatas
      )
    }


    authUser(requestDatas:AuthRequest):Observable<AuthResponse>{
      return this.http.post<AuthResponse>(
        `${this.API_URL}/auth`,requestDatas
      )
    }

    isLoggedIn():boolean{
      //Verificar  se o usuário  possui um token ou  cookie
      const JWT_TOKEN = this.cookie.get('USER_INFO')
      return JWT_TOKEN ? true : false
    }
  }
