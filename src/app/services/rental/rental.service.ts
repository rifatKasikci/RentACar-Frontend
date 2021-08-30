import { CreditCard } from './../../models/creditCard';
import { ObjectResponseModel } from './../../models/objectResponseModel';
import { ListResponseModel } from './../../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalDetail } from 'src/app/models/rentalDetail';
import { Rental } from 'src/app/models/rental';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = 'https://localhost:44320/api/'

  constructor(private httpClient:HttpClient) { }

  getRentals():Observable<ListResponseModel<RentalDetail>>{
    let apiUrl = this.apiUrl + "rentals/getrentaldetail"
    return this.httpClient.get<ListResponseModel<RentalDetail>>(apiUrl)
  }

  getLastRentalByCarId(carId:number):Observable<ObjectResponseModel<Rental>>{
    let apiUrl = this.apiUrl + "rentals/getlastrentalbycarid?carId=" + carId
    return this.httpClient.get<ObjectResponseModel<Rental>>(apiUrl)
  }

  addRental(rental:Rental):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "rentals/add"
    return this.httpClient.post<ResponseModel>(apiUrl,rental)
  }
}
