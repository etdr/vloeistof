import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MydrinksComponent } from './mydrinks/mydrinks.component';
import { MixComponent } from './mix/mix.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  { path: 'drinks', component: MydrinksComponent },
  { path: 'mix', component: MixComponent },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
