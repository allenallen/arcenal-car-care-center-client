import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { CUSTOMER_LIST } from '../mock-customers';

@Injectable()
export class CustomerService {

  constructor() { }

  getCustomers(): Customer[] {
    return CUSTOMER_LIST;
  }

}
