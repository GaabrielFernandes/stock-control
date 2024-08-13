import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../Services/user/user.service';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  loginCard  = true
  loginForm:FormGroup
  signupForm:FormGroup

  onSubmitLoginForm():void{
    if(this.loginForm.value &&  this.loginForm.valid){
      this.userService.authUser(this.loginForm.value).subscribe({
        next:(response) =>{
          if(response){
            this.cookieService.set('USER_INFO',response?.token)
            this.loginForm.reset()
            this.router.navigate(['/dashboard'])

            this.messageService.add({
              severity:'success',
              summary:'Sucesso',
              detail:`Bem Vindo  de volta ${response.name}`,
              life:2000
            })
            console.log('Sucesso')
          }
        },
        error:(err) =>{
          this.messageService.add({
            severity:'error',
            summary:'ERRO',
            detail:`Erro  ao  fazer o  login!`,
            life:2000
          })
          console.log(err)
        }
      })
    }
  }

  onSubmitSignupForm():void{
   if(this.signupForm.value   &&  this.signupForm.valid){
    this.userService.signupUser(this.signupForm.value).subscribe({
      next:(response)  =>{
        if(response)
        this.signupForm.reset
        this.loginCard  = true

        this.messageService.add({
          severity:'success',
          summary:'Sucesso',
          detail:`Usuário  criado  com  sucesso`,
          life:2000
        })
      },
      error:(err) => {
        this.messageService.add({
          severity:'error',
          summary:'ERRO',
          detail:`Erro  ao criar  usuário`,
          life:2000
        })
        console.log(err)
      }
    })
   }
  }

  constructor(
    private formBuilder: FormBuilder,
    private  userService: UserService,
    private cookieService:  CookieService,
    private  messageService: MessageService,
    private router: Router
    )
    {
    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })

    this.signupForm = this.formBuilder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
}
