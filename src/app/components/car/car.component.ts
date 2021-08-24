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
  carDetails:CarDetail[] = []
  cars:Car[] = []

  constructor(private carService:CarService , private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"]) {
        this.getCarsByBrandId(params["brandId"])
      }else if (params["colorId"]) {
        this.getCarsByColorId(params["colorId"])
      }else{
        this.getCars()
      }
    })
  }

  getCars(){
    return this.carService.getCars().subscribe((response) => {
      this.carDetails = response.data
      this.isDataLoaded = true
    })
  }

  getCarsByBrandId(brandId:number){
    return this.carService.getCarsByBrandId(brandId).subscribe((response) => {
      this.cars = response.data
      this.isDataLoaded = true
    })
  }

  getCarsByColorId(colorId:number){
    return this.carService.getCarsByColorId(colorId).subscribe((response) => {
      this.cars = response.data
      this.isDataLoaded = true
    })
  }

}
