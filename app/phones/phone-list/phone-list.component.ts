import { Component, OnInit } from '@angular/core';
import { PhoneService } from '../../shared/services/phone.service';
import { Phone } from '../../shared/models/phone';

@Component({
  templateUrl: './app/phones/phone-list/phone-list.component.html'
})
export class PhoneListComponent implements OnInit {
  phones: Phone[];

  constructor(private service: PhoneService) { }

  ngOnInit() { 
    this.service.getPhones()
      .subscribe(phones => this.phones = phones);   
  }

}