import { Customer } from './../../models/customer';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  isDataLoaded = false
  customers:Customer[] = []

  constructor(private customerService:CustomerService) { }

  ngOnInit(): void {
    this.getCustomers()
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data
      this.isDataLoaded = true
    })
  }
}
