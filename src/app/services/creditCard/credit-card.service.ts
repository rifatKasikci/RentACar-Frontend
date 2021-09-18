import { ListResponseModel } from './../../models/listResponseModel';
import { ResponseModel } from './../../models/responseModel';
import { Observable } from 'rxjs';
import { CreditCard } from './../../models/creditCard';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor(private httpClient:HttpClient) { }

  apiUrl = "https://localhost:44320/api/"

  addCreditCard(creditCard:CreditCard):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "creditCards/add"
    return this.httpClient.post<ResponseModel>(apiUrl , creditCard)
  }

  getCreditCardsByCustomerId(customerId:number):Observable<ListResponseModel<CreditCard>>{
    let apiUrl = this.apiUrl + "creditCards/getbycustomerid?customerId=" + customerId
    return this.httpClient.get<ListResponseModel<CreditCard>>(apiUrl)
  }
}
