import { CarImage } from './../../models/carImage';
import { CarDetail } from './../../models/carDetail';
import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car/car.service';
import { ActivatedRoute } from '@angular/router';
import { CarImageService } from 'src/app/services/car-image/car-image.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetail: CarDetail
  carImages: CarImage[] = []
  rootPath = "https://localhost:44320/images/"
  isDataLoaded = false

  constructor(private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["carId"]) {
        this.getCarDetail(params["carId"])
        this.getCarImages(params["carId"])
      }

    })

    

  }

  getCarDetail(carId: number) {
    this.carService.getCarById(carId).subscribe((carDetail) => {
      this.carDetail = carDetail.data
      this.isDataLoaded = true
    })
  }

  getCarImages(carId:number){
    this.carImageService.getImagesByCarId(carId).subscribe((carImages) => {
      this.carImages = carImages.data
      this.isDataLoaded = true
      console.log(this.carImages)
    })
  }

}
