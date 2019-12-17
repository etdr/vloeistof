import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {

  stripe;

  constructor() { }

  ngOnInit() {

    this.stripe = Stripe('pk_test_LC8qFB80rt5YAPF9pByKHTYb00BrnhTozl');
  }

}
