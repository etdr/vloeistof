import { Component, OnInit } from '@angular/core';

import { DonateService } from './donate.service';

declare var Stripe: any;

const STRIPEURL_TEST = 'pk_test_LC8qFB80rt5YAPF9pByKHTYb00BrnhTozl';
const STRIPEURL_LIVE = 'pk_live_jkRfYRTE1L8zKGHIf6CaW2Np00Ixl79Sjz';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {

  amount: number = 10;
  stripe;
  elements;
  card;
  clientSecret: string | undefined = undefined;
  succeeded: boolean | undefined = undefined;
  spin: boolean = false;
  errortext: string = "";

  constructor(private donateService: DonateService) { }

  ngOnInit() {

    this.stripe = Stripe(STRIPEURL_LIVE);
    this.elements = this.stripe.elements({
      fonts: [
        { cssSrc: 'https://use.typekit.net/gua2bru.css' }
      ]
    });

    this.card = this.elements.create('card', {
      style: {
        base: {
          fontSize: '3rem',
          color: '#6dd3cd',
          fontFamily: 'fairwater-sans'
        }
      }
    });
    
    
  }

  setAmount(a: number) {
    this.spin = true;
    const amt = a ? a : Math.floor(this.amount * 100);
    this.donateService.setAmount(amt)
      .subscribe(res => {
        this.clientSecret = res.clientSecret;
        setTimeout(() => {
          this.card.mount('#card-div');
          this.amount = amt;
          this.spin = false;
        }, 100);
        
      });
    
  }



  submitPayment() {
    this.spin = true;
    this.stripe.confirmCardPayment(this.clientSecret, {
      payment_method: {card: this.card}
    }).then(res => {
      if (res.error) {
        console.log(res.error.message);
        this.succeeded = false;
        this.errortext = res.error.message;
        this.spin = false;
      } else {
        if (res.paymentIntent.status === 'succeeded') {
          this.succeeded = true;
          console.log("payment succeeded");
          this.spin = false;
        }
      }
    })
  }

  resetEverything() {
    this.clientSecret = "";
    this.succeeded = undefined;
    this.card.destroy();
    this.card = this.elements.create('card', {
      style: {
        base: {
          fontSize: '3rem',
          color: '#6dd3cd',
          fontFamily: 'fairwater-sans'
        }
      }
    }); 
  }

}
