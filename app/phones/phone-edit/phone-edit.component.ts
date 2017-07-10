import { Component, OnInit } from '@angular/core';
import { Phone } from '../../shared/models/phone';
import { PhoneService } from '../../shared/services/phone.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './app/phones/phone-edit/phone-edit.component.html'
})
export class PhoneEditComponent implements OnInit {
  phone: Phone;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private service: PhoneService, private route: ActivatedRoute) { }

  ngOnInit() { 
    // grab the phone
    let id = this.route.snapshot.params['id'];
    this.service.getPhone(id).subscribe(phone => this.phone = phone);
  }

  /**
   * Update the phone
   */
  updatePhone() {
    this.successMessage = '';
    this.errorMessage   = '';

    this.service.updatePhone(this.phone)
      .subscribe(
        phone => {
          this.successMessage = 'Phone was updated.';
          console.log('phone was updated');
        },
        err => {
          this.errorMessage = err;
          console.error(err);
        }        
      );
  }


}