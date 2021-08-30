import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { Payment } from './../../models/payment';
import { PaymentService } from './../../services/payment/payment.service';
import { CreditCard } from './../../models/creditCard';
import { Component, OnInit } from '@angular/core';
import { CreditCardService } from 'src/app/services/creditCard/credit-card.service';
import { RentalService } from 'src/app/services/rental/rental.service';
import { CarService } from 'src/app/services/car/car.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  customerId: number = 1
  firstName: string
  lastName: string
  cardNumber: string
  cardExpMonth: number
  cardExpYear: number
  cvv: number
  cardType: string
  creditCard: CreditCard

  carForRent: Car

  rental: Rental
  rentDayCount: number

  routeLink = ""

  amountOfRent:number

  constructor(private creditCardService: CreditCardService,
    private paymentService: PaymentService,
    private rentalService: RentalService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["rental"]) {
        this.rental = JSON.parse(params["rental"])
        let carId = this.rental.carId
        this.rental.carId = parseInt(carId.toString())
        let diffrenceInTime = new Date(this.rental.returnDate).getTime() - new Date(this.rental.rentDate).getTime()
        this.rentDayCount = diffrenceInTime / (1000 * 3600 * 24)
        this.getCarByCarId(this.rental.carId)
      }
    })
  }

  calculateAmount(){
    this.amountOfRent = this.rentDayCount * this.carForRent.dailyPrice
    return this.amountOfRent
  }

  pay() {
    this.addCreditCard()
    this.addPayment()
    this.addRental(this.rental)
  }

  getCarByCarId(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.carForRent = response.data
    })
  }

  addPayment() {
    let payment: Payment = {
      id: 0,
      customerId: this.customerId,
      amount: this.calculateAmount()
    }
    this.paymentService.addPayment(payment).subscribe((response) => {
      if (response.success===true) {
        this.toastrService.success(response.message)
      }else{
        this.toastrService.error(response.message)
      }
    })

  }

  addRental(rental:Rental){
    this.rentalService.addRental(rental).subscribe((response) => {
      if (response.success===true) {
        this.toastrService.success(response.message)
      }else{
        this.toastrService.error(response.message)
      }
    })
  }

  addCreditCard(){
    let creditCard: CreditCard = {
      id: 0,
      customerId: this.customerId,
      fullName: this.firstName + " " + this.lastName,
      cardNumber: this.cardNumber,
      cardExpMonth: this.cardExpMonth,
      cardExpYear: this.cardExpYear,
      cvv: this.cvv,
      cardType: this.cardType,
      cardLimit: 1500
    }
    console.log(creditCard)
    this.creditCardService.addCreditCar(creditCard).subscribe((response) => {
      if (response.success===true) {
        this.toastrService.success(response.message)
      }else{
        this.toastrService.error(response.message)
      }
    })
  }

}
