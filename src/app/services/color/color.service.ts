import { ObjectResponseModel } from './../../models/objectResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { Color } from './../../models/color';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = 'https://localhost:44320/api/'

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>>{
    let apiUrl = this.apiUrl + "colors/getall"
    return this.httpClient.get<ListResponseModel<Color>>(apiUrl)
  }

  getColorByColorId(id:number):Observable<ObjectResponseModel<Color>>{
    let apiUrl = this.apiUrl + "colors/getbyid?id=" + id
    return this.httpClient.get<ObjectResponseModel<Color>>(apiUrl)
  }

  add(color:Color):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "colors/add"
    return this.httpClient.post<ResponseModel>(apiUrl , color)
  }

  update(color:Color):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "colors/update"
    return this.httpClient.post<ResponseModel>(apiUrl , color)
  }

  delete(color:Color):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "colors/delete"
    return this.httpClient.post<ResponseModel>(apiUrl , color)
  }
}
