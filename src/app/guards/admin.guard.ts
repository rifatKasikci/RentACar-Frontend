import { OperationClaim } from 'src/app/models/operationClaim';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalService } from '../services/local/local.service';
import { UserService } from '../services/user/user.service';
import { UserDetail } from '../models/userDetail';
import { ToastrService } from 'ngx-toastr';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  userClaim : string

  constructor(private localService:LocalService,
    private router:Router,
    private toastrService:ToastrService) {
     this.userClaim = JSON.parse(this.localService.getItem("user_claim") || "")
    }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     if (this.userClaim == "admin") {
      return true
     }else{
       this.router.navigate([""])
       this.toastrService.error("Bu sayfaya erişim yetkiniz yok!" , "İşlem başarısız!")
       return false
     }
  }

  
}
