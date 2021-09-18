import { ResponseModel } from 'src/app/models/responseModel';
import { Customer } from './../../models/customer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { CustomerForUpdateDto } from 'src/app/models/customerForUpdateDto';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl = 'https://localhost:44320/api/customers/'

  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>>{
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl + 'getall' )
  }

  getCustomerDetailsByUserId(userId:number):Observable<SingleResponseModel<CustomerDetail>>{
    let apiUrl = this.apiUrl + "getcustomerdetailsbyuserid?userId=" + userId
    return this.httpClient.get<SingleResponseModel<CustomerDetail>>(apiUrl)
  }

  update(customerForUpdateDto:CustomerForUpdateDto):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "update"
    return this.httpClient.post<ResponseModel>(apiUrl , customerForUpdateDto)
  }
}
