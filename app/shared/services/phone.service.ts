import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Phone } from '../models/phone';

@Injectable()
export class PhoneService {
  private phonesUrl: string = 'http://192.168.235.96:3000/api/phones';

  // observable source
  private phoneCreatedSource = new Subject<Phone>();
  private phoneDeletedSource = new Subject();

  // observable stream
  phoneCreated$ = this.phoneCreatedSource.asObservable();
  phoneDeleted$ = this.phoneDeletedSource.asObservable();
  
  constructor(private http: Http) {}

  /**
   * Get all phones
   */
  getPhones(): Observable<Phone[]> {
    return this.http.get(this.phonesUrl)
      .map(res => res.json())
      .map(phones => phones.map(this.toPhone))
      .catch(this.handleError);
  }

/**
   * Get a single phone
   */
  getPhone(id: number): Observable<Phone> {
    // attaching a token
    //let headers = new Headers();
    //headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.phonesUrl}/${id}`)
      .map(res => res.json())
      .map(this.toPhone)
      .catch(this.handleError);
  }
  /**
   * Create the phone
   */
  createPhone(phone: Phone): Observable<Phone> {
    return this.http.post(this.phonesUrl, phone)
      .map(res => res.json())
      .do(phone => this.phoneCreated(phone))
      .catch(this.handleError);
  }

  /**
   * Update the phone
   */
  updatePhone(phone: Phone): Observable<Phone> {
    return this.http.put(`${this.phonesUrl}/${phone.id}`, phone)
      .map(res => res.json())
      .catch(this.handleError);
  } 

    /**
   * Delete the user
   */
  deletePhone(id: string): Observable<any> {
    return this.http.delete(`${this.phonesUrl}/${id}`)
      .do(res => this.phoneDeleted())
      .catch(this.handleError);
  }

  /**
   * Convert user info from the API to our standard/format
   */
  
  private toPhone(phone): Phone {
    return {
      id: phone._id,
      number: phone.number,
      location: phone.location,
    };
  }

  /**
   * The phone was created. add this info to our stream
   */
  phoneCreated(user: Phone) {
    this.phoneCreatedSource.next(user);
  }

  /**
 * The phone was deleted. add this info to our stream
 */
  phoneDeleted() {
    this.phoneDeletedSource.next();
  }

  /**
   * Handle any errors from the API
   */

  private handleError(err) {
    let errMessage: string;

    if (err instanceof Response) {
      let body   = err.json() || '';
      let error  = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }

    return Observable.throw(errMessage);
  }

}