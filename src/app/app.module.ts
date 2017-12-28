import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';

import { FormsModule } from '@angular/forms';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';

import { CustomerService } from './customers/customer.service';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomerDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
