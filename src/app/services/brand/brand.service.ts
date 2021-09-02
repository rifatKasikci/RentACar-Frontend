import { ObjectResponseModel } from './../../models/objectResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { ListResponseModel } from './../../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand';
@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = 'https://localhost:44320/api/'

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let apiUrl = this.apiUrl + "brands/getall"
    return this.httpClient.get<ListResponseModel<Brand>>(apiUrl)
  }

  getBrandById(id:number):Observable<ObjectResponseModel<Brand>>{
    let apiUrl = this.apiUrl + "brands/getbyid?id=" + id
    return this.httpClient.get<ObjectResponseModel<Brand>>(apiUrl)
  }

  add(brand:Brand):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "brands/add"
    return this.httpClient.post<ResponseModel>(apiUrl , brand)
  }

  update(brand:Brand):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "brands/update"
    return this.httpClient.post<ResponseModel>(apiUrl , brand)
  }

  delete(brand:Brand):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "brands/delete"
    return this.httpClient.post<ResponseModel>(apiUrl , brand)
  }

}
