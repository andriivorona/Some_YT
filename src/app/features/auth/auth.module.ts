import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AuthRoutingModule} from './auth-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    //Оскільки ваші компоненти LoginComponent і RegisterComponent є standalone (незалежними),
    //Натомість їх потрібно імпортувати безпосередньо в модулі, де вони використовуються.
    LoginComponent,
    RegisterComponent,
  ]
})
export class AuthModule { }
