import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Phone } from '../../shared/models/phone';
import { PhoneService } from '../../shared/services/phone.service';

@Component({
    //selector: 'selector-name',
    templateUrl: './app/phones/phone-single/phone-single.component.html'
})

export class PhoneSingleComponent implements OnInit {
    phone: Phone;
    constructor(
        private route: ActivatedRoute,
        private router: Router, 
        private service: PhoneService 
        ) { }

    ngOnInit() {
        // grab the slug from the url
        let id = this.route.snapshot.params['id'];

        // use the phoneservice to getPhone()
        this.service.getPhone(id)
            .subscribe(phone => this.phone = phone);
     }

     /**
      * Delete a phone
    */

    deletePhone() {
        this.service.deletePhone(this.phone.id)
        .subscribe(data => {
            this.router.navigate(['phones']);
        });

    }      
}