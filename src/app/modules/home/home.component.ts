import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Password } from 'primeng/password';

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
    console.log("DADOS  DO FORMULÁRIO DE LOGIN", this.loginForm.value)
  }

  onSubmitSignupForm():void{
    console.log("DADOS DO FORMULÁRIO DE CRIAÇÃO DE CONTA", this.signupForm.value)
  }

  constructor(private formBuilder: FormBuilder){
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
