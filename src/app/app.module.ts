import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { MixComponent, AddIngDialog } from './mix/mix.component';
import { MydrinksComponent } from './mydrinks/mydrinks.component';
import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { FooterComponent } from './footer/footer.component';
import { CreditsComponent } from './credits/credits.component';
import { SearchResultsComponent } from './search/search-results/search-results.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DrinksListComponent, ModifyDrinkDialog, ConfirmDeleteDialog } from './mydrinks/drinkslist/drinkslist.component';
import { AdminComponent } from './admin/admin.component';
import { PostComponent } from './mydrinks/drinkslist/postbox/post.component';
import { PostboxComponent } from './mydrinks/drinkslist/postbox/postbox.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    MixComponent,
    AddIngDialog,
    MydrinksComponent,
    AuthComponent,
    SignupComponent,
    LoginComponent,
    FooterComponent,
    CreditsComponent,
    SearchResultsComponent,
    DrinksListComponent,
    ModifyDrinkDialog,
    ConfirmDeleteDialog,
    AdminComponent,
    PostComponent,
    PostboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatIconModule,
    MatTabsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatDialogModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [
    ModifyDrinkDialog,
    ConfirmDeleteDialog,
    AddIngDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
