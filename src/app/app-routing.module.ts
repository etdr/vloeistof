import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MydrinksComponent } from './mydrinks/mydrinks.component';
import { MixComponent } from './mix/mix.component';
import { SearchComponent } from './search/search.component';
import { CreditsComponent } from './credits/credits.component';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';

import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './admin.guard';
import { DrinksListComponent } from './mydrinks/drinkslist/drinkslist.component';


const routes: Routes = [
  { path: 'drinks', component: MydrinksComponent, canActivate: [AuthGuard],
    children: [
      { path: 'my', component: DrinksListComponent },
      { path: 'created', component: DrinksListComponent },
      { path: 'api', component: DrinksListComponent },
      { path: 'favorite', component: DrinksListComponent },
      { path: 'all', component: DrinksListComponent }
    ]},
  { path: 'mix', component: MixComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'credits', component: CreditsComponent },
  { path: 'login', component: AuthComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
