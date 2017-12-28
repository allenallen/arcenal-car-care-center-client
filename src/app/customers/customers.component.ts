import { Component, OnInit } from '@angular/core';
import { Customer } from './customer';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: Customer[];
  selectedCustomer: Customer;

  constructor(private customerService: CustomerService) { }

/** initialize var here */
  ngOnInit() {
    this.getCustomers();
  }

  onSelect(customer: Customer): void {
    this.selectedCustomer = customer;
  }

  getCustomers(): void {
    this.customers = this.customerService.getCustomers();
  }
}
