import { ResponseModel } from 'src/app/models/responseModel';
import { CarFilter } from './../../models/carFilter';
import { SingleResponseModel } from './../../models/singleResponseModel';
import { CarDetail } from './../../models/carDetail';
import { ListResponseModel } from './../../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = 'https://localhost:44320/api/'

  constructor(private httpClient:HttpClient) { }

  getCarDetails():Observable<ListResponseModel<CarDetail>>{
    let apiUrl = this.apiUrl + "cars/getcardetail"
    return this.httpClient.get<ListResponseModel<CarDetail>>(apiUrl)
  }

  getCarDetailsByBrandId(brandId:number):Observable<ListResponseModel<CarDetail>>{
    let apiUrl = this.apiUrl + "cars/getcarsbybrandid?brandId=" + brandId
    return this.httpClient.get<ListResponseModel<CarDetail>>(apiUrl)
  }

  getCarDetailsByColorId(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let apiUrl = this.apiUrl + "cars/getcarsbycolorid?colorId=" + colorId
    return this.httpClient.get<ListResponseModel<CarDetail>>(apiUrl)
  }

  getCarDetailById(carId:number):Observable<SingleResponseModel<CarDetail>>{
    let apiUrl = this.apiUrl + "cars/getcardetailbycarid?carId=" + carId
    return this.httpClient.get<SingleResponseModel<CarDetail>>(apiUrl)
  }

  getCarById(carId:number):Observable<SingleResponseModel<Car>>{
    let apiUrl = this.apiUrl + "cars/getbyid?id=" + carId
    return this.httpClient.get<SingleResponseModel<Car>>(apiUrl)
  }

  getCarDetailsByFiltered(carFilter:CarFilter):Observable<ListResponseModel<CarDetail>>{
    let apiUrl = this.apiUrl + "cars/getcardetailsbyfiltered"
    return this.httpClient.post<ListResponseModel<CarDetail>>(apiUrl , carFilter)
  }

  add(car:Car):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "cars/add"
    return this.httpClient.post<ResponseModel>(apiUrl , car)
  }

  update(car:Car):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "cars/update"
    return this.httpClient.post<ResponseModel>(apiUrl , car)
  }

  delete(car:Car):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "cars/delete"
    return this.httpClient.post<ResponseModel>(apiUrl , car)
  }

  
}
