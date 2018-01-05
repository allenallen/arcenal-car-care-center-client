import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessagesService } from '../messages/messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

@Injectable()
export class CustomerService {

  private customersUrl = 'api/customers';

  constructor(private http: HttpClient, private messageService: MessagesService) { }

  getCustomers(): Observable<Customer[]> {
    this.messageService.add(`CustomerService: fetched customers`);
    return this.http.get<Customer[]>(this.customersUrl)
            .pipe(
              tap(customers => this.log(`fetched customers`)),
              catchError(this.handleError('getCustomers', []))
            );
  }

  getCustomer(id: number): Observable<Customer> {
    const url = `${this.customersUrl}/${id}`;
    return this.http.get<Customer>(url).pipe(
      tap(_ => this.log(`fetched customer id=${id}`)),
      catchError(this.handleError<Customer>(`getCustomer id=${id}`))
    );
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.customersUrl, customer, httpOptions).pipe(
      tap((newCustomer: Customer) => this.log(`added customer w id=${newCustomer.id}`)),
      catchError(this.handleError<Customer>('addCustomer', customer))
    );
  }

  updateCustomer(customer: Customer): Observable<any> {
    return this.http.post(this.customersUrl, customer, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${customer.id}`)),
      catchError(this.handleError<any>('updateCustomer'))
    );
  }

  deleteCustomer(customer: Customer): Observable<Customer> {
    const id = typeof customer === 'number' ? customer : customer.id;
    const url = `${this.customersUrl}/${id}`;

    return this.http.delete<Customer>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted customer id=${id}`)),
      catchError(this.handleError<Customer>('deleteCustomer'))
    );
  }

  searchCustomers(term: String): Observable<Customer[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Customer[]>(`api/customers/?name=${term}`).pipe(
      tap(_ => this.log(`found customers matching "${term}`)),
      catchError(this.handleError<Customer[]>('searchCustomers', []))
    );
  }

  private log(message: string) {
    this.messageService.add('CustomerService: ' + message);
  }

  private handleError<T> (operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getCustomerNo404<Data>(id: number): Observable<Customer> {
    const url = `${this.customersUrl}/?id=${id}`;
    return this.http.get<Customer[]>(url)
      .pipe(
        map(customers => customers[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} customer id=${id}`);
        }),
        catchError(this.handleError<Customer>(`getCustomer id=${id}`))
      );
  }
}
