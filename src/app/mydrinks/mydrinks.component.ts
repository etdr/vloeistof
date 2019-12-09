import { Component, OnInit } from '@angular/core';
// import {MatCardModule} from '@angular/material/card';
import { DrinksService } from '../drinks.service';
import { Drink } from '../types';

@Component({
  selector: 'app-mydrinks',
  templateUrl: './mydrinks.component.html',
  styleUrls: ['./mydrinks.component.scss']
})
export class MydrinksComponent implements OnInit {

  //myDrinks: Drink[] = [];

  navLinks = [
    {label: 'my', path:'./my'},
    {label: 'created', path:'./created'},
    {label: 'api', path:'./api'},
    {label: 'favorite', path:'./favorite'},
    {label: 'all', path:'./all'}
  ];

  constructor(private drinksService: DrinksService) { }

  ngOnInit() {
//this is where we fetch all of the drinks
    //this.drinksService.getDrinks().subscribe(drinks=> this.myDrinks=drinks);
  }
}

//there will be other functions above for modify/delete. there will be a button to bind to the cooresponding function
