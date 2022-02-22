import { NgModule } from '@angular/core';
import {AppComponent} from './app.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserFormComponent} from './forms/user-form/user-form.component';
import {PersonalAccountComponent} from './personal-account/personal-account.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing,module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from './service/user.service';
import {HotelService} from './service/hotel.service';
import {CityService} from './service/city.service';
import {CountryService} from './service/country.service';
import {TypeService} from './service/type.service';
import {TourService} from './service/tour.service';
import {TourListComponent} from './tour-list/tour-list.component';
import {TourFormComponent} from './forms/tour-form/tour-form.component';
import {TypeFormComponent} from './forms/type-form/type-form.component';
import {HotelFormComponent} from './forms/hotel-form/hotel-form.component';
import { CityFormComponent } from './forms/city-form/city-form.component';
import { CountryFormComponent } from './forms/country-form/country-form.component';
import { LoginFormComponent } from './forms/login-form/login-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { TypesPipe } from './filters/types.pipe';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { CountriesPipe } from './filters/countries.pipe';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    TourListComponent,
    PersonalAccountComponent,
    TourFormComponent,
    TypeFormComponent,
    HotelFormComponent,
    CityFormComponent,
    CountryFormComponent,
    LoginFormComponent,
    TypesPipe,
    CountriesPipe
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule
    ],
  providers: [
    UserService,
    HotelService,
    CityService,
    CountryService,
    TypeService,
    TourService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
