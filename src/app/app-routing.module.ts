import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MydrinksComponent } from './mydrinks/mydrinks.component';
import { MixComponent } from './mix/mix.component';
import { SearchComponent } from './search/search.component';
import { CreditsComponent } from './credits/credits.component';


const routes: Routes = [
  { path: 'drinks', component: MydrinksComponent },
  { path: 'mix', component: MixComponent },
  { path: 'search', component: SearchComponent },
  { path: 'credits', component: CreditsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
