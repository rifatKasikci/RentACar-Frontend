import { Color } from './../../models/color';
import { Brand } from 'src/app/models/brand';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/services/local/local.service';
import { UserDetail } from 'src/app/models/userDetail';
import { BrandService } from 'src/app/services/brand/brand.service';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  isAuthorizated = false
  userDetails: UserDetail
  brands: Brand[]
  colors: Color[]

  constructor(private brandService: BrandService,
    private colorService: ColorService,
    private localService: LocalService,
    private router: Router,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.checkIsAuthorizated()
    this.getUserDetails()
    this.getBrands()
    this.getColors()
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data
    })
  }

  getColors(){
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data
    })
  }

  getUserDetails() {
    this.userDetails = JSON.parse(this.localService.getItem("user_details") || '')
  }

  checkIsAuthorizated() {
    if (this.localService.getItem("token")) {
      this.isAuthorizated = true
    } else {
      this.isAuthorizated = false
    }
  }

  logOut() {
    this.localService.delete("token")
    this.localService.delete("user_details")
    this.toastrService.info("Çıkış yapıldı.", "Bilgilendirme!")
    this.router.navigate(["login"])
    window.location.reload()
  }

}
