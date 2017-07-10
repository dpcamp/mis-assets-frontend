import { Component, OnInit } from '@angular/core';
import { PhoneService } from '../shared/services/phone.service';

@Component({
    selector: 'my-phones',
    templateUrl: './app/phones/phones.component.html'
})

export class PhonesComponent implements OnInit {
    successMessage: string = '';
    errorMessage: string = '';

    constructor(private service: PhoneService) { }

  ngOnInit() { 
    // phone has been created
    this.service.phoneCreated$.subscribe(phone => {
      this.successMessage = `${phone.number} has been created!`;
      this.clearMessages();
    });

    // phone has been deleted
    this.service.phoneDeleted$.subscribe(() => {
      this.successMessage = `The phone has been deleted!`;
      this.clearMessages();
    });
  }

  /**
   * Clear all messages after 5 seconds
   */
  clearMessages() {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage   = '';
    }, 5000);
  }
}