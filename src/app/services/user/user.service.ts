import { ResponseModel } from 'src/app/models/responseModel';
import { UserDetail } from './../../models/userDetail';
import { SingleResponseModel } from './../../models/singleResponseModel';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserForUpdateDto } from 'src/app/models/userForUpdateDto';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { OperationClaim } from 'src/app/models/operationClaim';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'https://localhost:44320/api/'

  constructor(private httpClient:HttpClient) { }

  getUserById(userId:number):Observable<SingleResponseModel<User>>{
    let apiUrl = this.apiUrl + "users/getuserbyuserid?userId=" + userId
    return this.httpClient.get<SingleResponseModel<User>>(apiUrl)
  }

  getClaimsByUserId(userId:number):Observable<ListResponseModel<OperationClaim>>{
    let apiUrl = this.apiUrl + "users/getclaimsbyuserid?userId=" + userId
    return this.httpClient.get<ListResponseModel<OperationClaim>>(apiUrl)
  }

  getUserDetailsByEmail(email:string):Observable<SingleResponseModel<UserDetail>>{
    let apiUrl = this.apiUrl + "users/getuserdetailsbyemail?email=" + email
    return this.httpClient.get<SingleResponseModel<UserDetail>>(apiUrl)
  }

  update(userForUpdateDto:UserForUpdateDto):Observable<ResponseModel>{
    let apiUrl = this.apiUrl + "users/update"
    return this.httpClient.post<ResponseModel>(apiUrl , userForUpdateDto)
  }
}
