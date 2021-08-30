import { Color } from './../../models/color';
import { Brand } from './../../models/brand';
import { ColorService } from './../../services/color/color.service';
import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/services/brand/brand.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {

  brands:Brand[] = []
  colors:Color[] = []
  isDataLoaded = false
  selectedBrandId:number
  selectedColorId:number
  routeLink = ""


  constructor(private brandService:BrandService , private colorService:ColorService) { }

  ngOnInit(): void {
    this.getBrands()
    this.getColors()
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data
      this.isDataLoaded = true
    })
  }

  getColors(){
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data
      this.isDataLoaded = true
    })
  }

  changeButtonClass(){
    if (this.selectedBrandId ||this.selectedColorId) {
      return "btn btn-success"
    }else{
      return "btn btn-success disabled"
    }
  }

  changeRouteLink(){
    if (this.selectedBrandId!==null && this.selectedColorId!==null) {
      this.routeLink = "/cars/brand/" + this.selectedBrandId + "/color/" + this.selectedColorId
      return this.routeLink
    }else if(this.selectedBrandId==null && this.selectedColorId!==null){
      this.routeLink = "/cars/color/" + this.selectedColorId
      return this.routeLink
    }else if(this.selectedBrandId!==null && this.selectedColorId == null){
      this.routeLink = "/cars/brand/" + this.selectedBrandId
      return this.routeLink
    }else{
      this.routeLink = "/"
      return this.routeLink
    }
  }


}
