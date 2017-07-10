import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Phone } from '../../shared/models/phone';
import { PhoneService } from '../../shared/services/phone.service';

@Component({
  templateUrl: './app/phones/phone-create/phone-create.component.html'
})
export class PhoneCreateComponent implements OnInit {
  phone: Phone = { 
      number: '', 
      location: ''
     };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private service: PhoneService, private router: Router) { }

  ngOnInit() {
  }

  /**
   * Create a phone
   */
  createPhone() {
    this.successMessage = '';
    this.errorMessage   = '';

    this.service.createPhone(this.phone)
      .subscribe(phone => {
        this.successMessage = 'Phone was created!';
        console.log('phone was created');

        // navigate back to the phones page
        this.router.navigate(['/phones']);
      })
  }

}