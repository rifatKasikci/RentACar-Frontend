import { Car } from '../../models/carDetail';
import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  isDataLoaded = false
  cars:Car[] = []

  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.getCars()
  }

  getCars(){
    return this.carService.getCars().subscribe((response) => {
      this.cars = response.data
      this.isDataLoaded = true
    })
  }

}
