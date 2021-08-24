import { ObjectResponseModel } from './../../models/objectResponseModel';
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

  getCars():Observable<ListResponseModel<CarDetail>>{
    let apiUrl = this.apiUrl + "cars/getcardetail"
    return this.httpClient.get<ListResponseModel<CarDetail>>(apiUrl)
  }

  getCarsByBrandId(brandId:number):Observable<ListResponseModel<Car>>{
    let apiUrl = this.apiUrl + "cars/getcarsbybrandid?brandId=" + brandId
    return this.httpClient.get<ListResponseModel<Car>>(apiUrl)
  }

  getCarsByColorId(colorId:number):Observable<ListResponseModel<Car>>{
    let apiUrl = this.apiUrl + "cars/getcarsbycolorid?colorId=" + colorId
    return this.httpClient.get<ListResponseModel<Car>>(apiUrl)
  }

  getCarById(carId:number):Observable<ObjectResponseModel<CarDetail>>{
    let apiUrl = this.apiUrl + "cars/getcardetailbycarid?carId=" + carId
    return this.httpClient.get<ObjectResponseModel<CarDetail>>(apiUrl)
  }
  
}
