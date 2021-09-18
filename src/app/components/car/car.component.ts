import { CarFilter } from './../../models/carFilter';
import { Car } from './../../models/car';
import { CarDetail } from '../../models/carDetail';
import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car/car.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  isDataLoaded = false
  filterText = ""
  colorFilter = []
  brandFilter = []
  carDetails:CarDetail[] = []

  constructor(private carService:CarService , private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["brandId"] && params["colorId"]) {
        this.getCarDetailsByFiltered(params["brandId"],params["colorId"])
      }else if (params["brandId"]) {
        this.getCarDetailsByBrandId(params["brandId"])
      }else if (params["colorId"]) {
        this.getCarDetailsByColorId(params["colorId"])
      }else{
        this.getCarDetails()
      }
    })
  }

  getCarDetails(){
    return this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data
      this.isDataLoaded = true
    })
  }

  getCarDetailsByBrandId(brandId:number){
    return this.carService.getCarDetailsByBrandId(brandId).subscribe((response) => {
      this.carDetails = response.data
      this.isDataLoaded = true
    })
  }

  getCarDetailsByColorId(colorId:number){
    return this.carService.getCarDetailsByColorId(colorId).subscribe((response) => {
      this.carDetails = response.data
      this.isDataLoaded = true
      console.log(response.data)
    })
  }

  getCarDetailsByFiltered(brandId:number , colorId:number){
    let carFilter:CarFilter = {brandId : parseInt(brandId.toString()) , colorId : parseInt(colorId.toString())}
    return this.carService.getCarDetailsByFiltered(carFilter).subscribe((response) => {
      this.carDetails = response.data
      this.isDataLoaded = true
    })
  }

}
