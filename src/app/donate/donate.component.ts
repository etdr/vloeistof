import { Component, OnInit } from '@angular/core';

declare var Stripe: any;

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {

  stripe;
  elements;

  constructor() { }

  ngOnInit() {

    this.stripe = Stripe('pk_test_LC8qFB80rt5YAPF9pByKHTYb00BrnhTozl');
    this.elements = this.stripe.elements();
  }

}
