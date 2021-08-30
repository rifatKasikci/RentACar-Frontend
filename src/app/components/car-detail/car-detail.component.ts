import { Rental } from 'src/app/models/rental';
import { CarImage } from './../../models/carImage';
import { CarDetail } from './../../models/carDetail';
import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarImageService } from 'src/app/services/car-image/car-image.service';
import { RentalService } from 'src/app/services/rental/rental.service';
import { ToastrService } from 'ngx-toastr';

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
  carId: number
  lastRental = {id: 0, carId: 0, customerId: 0, rentDate: new Date(2021, 12, 12), returnDate: new Date(2021, 12, 12)}
  newRental: Rental = { id: 0, carId: 0, customerId: 0, rentDate: new Date(2021, 12, 12), returnDate: new Date(2021, 12, 12) }
  customerId: number = 1
  rentDate: string
  returnDate: string
  lastRentalReturnDate: string
  isDatesValid = false

  constructor(private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["carId"]) {
        this.carId = params["carId"]
        this.getCarDetail(params["carId"])
        this.getCarImages(params["carId"])
        this.getLastRentalByCarId(params["carId"])
      }
    })
  }

  getCarDetail(carId: number) {
    this.carService.getCarDetailById(carId).subscribe((carDetail) => {
      this.carDetail = carDetail.data
      this.isDataLoaded = true
    })
  }

  getCarImages(carId: number) {
    this.carImageService.getImagesByCarId(carId).subscribe((carImages) => {
      this.carImages = carImages.data
      this.isDataLoaded = true
    })
  }

  getLastRentalByCarId(carId: number) {
    this.rentalService.getLastRentalByCarId(carId).subscribe((response) => {
      this.lastRental = response.data
      if (response.data) {
        this.lastRentalReturnDate = this.returnDateFormat()
      }else{
        this.lastRentalReturnDate = new Date().toString()
      }
    })
  }

  returnDateFormat() {
    this.lastRentalReturnDate = new Date(this.lastRental.returnDate.toString()).getFullYear().toString() + "-"
    if (new Date(this.lastRental.returnDate.toString()).getMonth() < 10) {
      this.lastRentalReturnDate += "0" + (new Date(this.lastRental.returnDate.toString()).getMonth()+1).toString() + "-"
    } else {
      this.lastRentalReturnDate += (new Date(this.lastRental.returnDate.toString()).getMonth()+1).toString() + "-"
    }
    if (new Date(this.lastRental.returnDate.toString()).getDate() < 10) {
      this.lastRentalReturnDate += "0" + (new Date(this.lastRental.returnDate.toString()).getDate()+1).toString()
    } else {
      this.lastRentalReturnDate += (new Date(this.lastRental.returnDate.toString()).getDate()+1).toString()
    }
    return this.lastRentalReturnDate.toString()
  }

  controlDates() {
    if (Date.parse(this.rentDate) > Date.parse(this.returnDate) ||
      Date.parse(this.rentDate) < Date.now() - 86400000 ||
      !this.rentDate || !this.returnDate
    ) {
      this.isDatesValid = false
    } else {
      this.isDatesValid = true
    }

  }
  rentCar(rental: Rental) {
    this.controlDates()
    rental.carId = this.carId
    rental.customerId = this.customerId
    rental.rentDate = new Date(this.rentDate)
    rental.returnDate = new Date(this.returnDate)
    if (this.isDatesValid === true) {
      this.toastrService.success("İşlem başarılı! Ödeme sayfasına yönlendiriliyorsunuz.")
      this.router.navigate(['/cars/detail/rent/', JSON.stringify(rental)]);
    } else {
      this.toastrService.error("Tarih bilgileri geçersiz.")
      this.router.navigate(["/"])
    }
  }

}
