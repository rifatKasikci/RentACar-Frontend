import { UserForUpdateDto } from './../../models/userForUpdateDto';
import { User } from 'src/app/models/user';
import { CustomerDetail } from './../../models/customerDetail';
import { UserDetail } from './../../models/userDetail';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { UserService } from 'src/app/services/user/user.service';
import { LocalService } from 'src/app/services/local/local.service';
import { Customer } from 'src/app/models/customer';
import { CustomerForUpdateDto } from 'src/app/models/customerForUpdateDto';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User
  customer: Customer
  userDetail: UserDetail
  customerDetail: CustomerDetail
  userUpdateForm: FormGroup
  userUpdateModel: User

  constructor(private userService: UserService,
    private customerService: CustomerService,
    private localService: LocalService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getUserByUserId()
  }

  updateUser() {
    let userDetail = JSON.parse(this.localService.getItem("user_details") || '')
    let userUpdateModel: UserForUpdateDto = { 
      id: userDetail.id, 
      firstName: this.userUpdateForm.value.firstName, 
      lastName: this.userUpdateForm.value.lastName, 
      email: this.userUpdateForm.value.email 
    }

    this.userService.update(userUpdateModel).subscribe((response) => {
      this.toastrService.success("Kullanıcı güncellendi" , "İşlem başarılı!")
      this.localService.update("user_details" , JSON.stringify(userUpdateModel))
    },(responseError) => {
      if (responseError.error.Errors.length>0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage , "İşlem başarısız")
        }
      }
    })
    this.updateCustomer()
  }

  updateCustomer(){
    let componyName = this.userUpdateForm.value.companyName
    let customerUpdateModel : CustomerForUpdateDto = { customerId : this.customerDetail.id  , companyName : componyName}
    this.customerService.update(customerUpdateModel).subscribe((response) => {
      console.log(response)
      window.location.reload()
    },(responseError) => {
      if (responseError.error.Errors.length>0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage , "İşlem başarısız")
        }
      }
    })
  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      firstName: [this.userDetail.firstName],
      lastName: [this.userDetail.lastName],
      email: [this.userDetail.email],
      companyName: [this.customerDetail.companyName]
    })
  }

  getUserByUserId() {
    this.userDetail = JSON.parse(localStorage.getItem("user_details") || '');
    this.userService.getUserById(this.userDetail.id).subscribe((response) => {
      console.log(response)
      this.user = response.data
      this.getCustomerDetailsByUserId()
    })
  }

  getCustomerDetailsByUserId() {
    this.customerService.getCustomerDetailsByUserId(this.userDetail.id).subscribe((response) => {
      this.customerDetail = response.data
      this.createUserUpdateForm()
    })
  }

}
