import { UserDetail } from './../../models/userDetail';
import { User } from './../../models/user';
import { Car } from 'src/app/models/car';
import { Rental } from 'src/app/models/rental';
import { Payment } from './../../models/payment';
import { PaymentService } from './../../services/payment/payment.service';
import { CreditCard } from './../../models/creditCard';
import { Component, OnInit } from '@angular/core';
import { CreditCardService } from 'src/app/services/creditCard/credit-card.service';
import { RentalService } from 'src/app/services/rental/rental.service';
import { CarService } from 'src/app/services/car/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder , FormGroup , Validators , FormControl } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { LocalService } from 'src/app/services/local/local.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  customerId: number

  carForRent: Car

  rental: Rental
  rentDayCount: number

  routeLink = ""

  amountOfRent:number

  creditCardAddForm:FormGroup
  saveCreditCard:boolean = false
  creditCards:CreditCard[] = []
  currentCardId:number

  constructor(private creditCardService: CreditCardService,
    private paymentService: PaymentService,
    private rentalService: RentalService,
    private carService: CarService,
    private customerService:CustomerService,
    private localService:LocalService,
    private formBuilder:FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService,
    private router:Router) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["rental"]) {
        this.setCustomerId()
        this.rental = JSON.parse(params["rental"])
        let carId = this.rental.carId
        this.rental.carId = parseInt(carId.toString())
        let diffrenceInTime = new Date(this.rental.returnDate).getTime() - new Date(this.rental.rentDate).getTime()
        this.rentDayCount = diffrenceInTime / (1000 * 3600 * 24)
        this.getCarByCarId(this.rental.carId)
        this.createCreditCardAddForm()
      }
    })
  }

  selectSavedCreditCard(creditCard:CreditCard){
    this.creditCardAddForm.setValue({
      fullName:creditCard.fullName,
      cardNumber:creditCard.cardNumber,
      cardExpMonth:creditCard.cardExpMonth,
      cardExpYear:creditCard.cardExpYear,
      cvv:creditCard.cvv,
      cardType:creditCard.cardType
    })
    this.setCurrentCardId(creditCard.id)
  }

  setCustomerId(){
    let user:UserDetail = JSON.parse(this.localService.getItem("user_details") || '')
    console.log(user)
    this.customerService.getCustomerDetailsByUserId(user.id).subscribe((response) => {
      this.customerId = response.data.id
      this.getCreditCardsByCustomerId(this.customerId)
      console.log(this.customerId)
    })
  }

  calculateAmount(){
    this.amountOfRent = this.rentDayCount * this.carForRent.dailyPrice
    return this.amountOfRent
  }

  changeCurrentCardClass(cardId:number){
    if (this.currentCardId == cardId) {
      return "list-group-item list-group-item-action active"
    }else{
      return "list-group-item list-group-item-action"
    }
  }

  setCurrentCardId(cardId:number){
    this.currentCardId = cardId
  }

  pay() {
    if (this.saveCreditCard) {
      if (this.creditCardAddForm.valid) {
        this.addCreditCard()
        this.addPayment()
        this.addRental(this.rental)
      }else{
        this.toastrService.error("Form bilgileri eksik!" , "İşlem başarısız!")
      }
    }else{
      this.addPayment()
      this.addRental(this.rental)
    }
  }

  getCarByCarId(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.carForRent = response.data
    })
  }

  getCreditCardsByCustomerId(customerId:number){
    this.creditCardService.getCreditCardsByCustomerId(customerId).subscribe((response) => {
      this.creditCards = response.data
      console.log(this.creditCards)
    })
  }

  addRental(rental:Rental){
    this.rentalService.addRental(rental).subscribe((response) => {
      this.toastrService.success(response.message)
      this.router.navigate(["/cars"]) 
    },(errorResponse)=>{
      if (errorResponse.error.Errors.length > 0) {
        for (let i = 0; i < errorResponse.error.Errors.length; i++) {
          this.toastrService.error(errorResponse.error.Errors[i], "İşlem başarısız!")
        }
      }
    })
  }

  addPayment(){
    let payment:Payment = {id : 0 ,customerId : this.customerId , amount : this.amountOfRent}
    this.paymentService.addPayment(payment).subscribe((response) => {
      this.toastrService.success("Ödeme yapıldı." , "İşlem başarılı!")
    },(errorResponse)=>{
      if (errorResponse.error.Errors.length > 0) {
        for (let i = 0; i < errorResponse.error.Errors.length; i++) {
          this.toastrService.error(errorResponse.error.Errors[i], "İşlem başarısız!")
        }
      }
    })
  }

  addCreditCard(){
    let creditCard:CreditCard = Object.assign({} , this.creditCardAddForm.value)
    creditCard.customerId = this.customerId
    creditCard.cardLimit = 5000
    this.creditCardService.addCreditCard(creditCard).subscribe((response) => { 
      console.log(response)
      this.toastrService.info("Kredi kartı kaydedildi" , "Bilgilendirme!")
    },(errorResponse)=>{
      console.log(errorResponse)
      if (errorResponse.error.Errors.length > 0) {
        for (let i = 0; i < errorResponse.error.Errors.length; i++) {
          this.toastrService.error(errorResponse.error.Errors[i], "İşlem başarısız!")
        }
      }
    })
  }

  createCreditCardAddForm(){
    this.creditCardAddForm = this.formBuilder.group({
      fullName:["",Validators.required],
      cardNumber:["",Validators.required],
      cardExpMonth:["",Validators.required],
      cardExpYear:["",Validators.required],
      cvv:["",Validators.required],
      cardType:["",Validators.required]
    })
  }

}
