import { ListResponseModel } from './../../models/listResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarImage } from 'src/app/models/carImage';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {

  apiUrl = "https://localhost:44320/api/"

  constructor(private httpClient:HttpClient) { }

  getImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let apiUrl = this.apiUrl + "carImages/getbycarid?carId=" + carId 
    return this.httpClient.get<ListResponseModel<CarImage>>(apiUrl)
  }
}
