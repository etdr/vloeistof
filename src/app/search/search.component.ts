import { Component, OnInit } from '@angular/core';

import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  term: string = "";

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }


  searchByName () {
    this.searchService.getDrinksByName(this.term);
  }

}
