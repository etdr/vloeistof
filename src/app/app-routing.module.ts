import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MydrinksComponent } from './mydrinks/mydrinks.component';
import { MixComponent } from './mix/mix.component';
import { SearchComponent } from './search/search.component';
import { CreditsComponent } from './credits/credits.component';
import { AuthComponent } from './auth/auth.component';

import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: 'drinks', component: MydrinksComponent, canActivate: [AuthGuard] },
  { path: 'mix', component: MixComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'credits', component: CreditsComponent },
  { path: 'login', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
