import { RegisterModel } from './../../models/registerModel';
import { LocalService } from './../local/local.service';
import { LoginModel } from './../../models/loginModel';
import { Token } from './../../models/token';
import { SingleResponseModel } from './../../models/singleResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:44320/api/'

  constructor(private httpClient:HttpClient,
    private localService:LocalService) { }

  login(loginModel:LoginModel):Observable<SingleResponseModel<Token>>{
    let apiUrl = this.apiUrl + "auth/login"
    return this.httpClient.post<SingleResponseModel<Token>>(apiUrl , loginModel)
  }

  register(registerModel:RegisterModel):Observable<SingleResponseModel<Token>>{
    let apiUrl = this.apiUrl + "auth/register"
    return this.httpClient.post<SingleResponseModel<Token>>(apiUrl , registerModel)
  }

  isAuthenticated(){
    if (this.localService.getItem("token") && this.localService.getItem("user_details")) {
      return true
    }else{
      return false
    }
  }
  
}
