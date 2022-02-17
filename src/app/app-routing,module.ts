import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './forms/user-form/user-form.component';
import {TourListComponent} from './tour-list/tour-list.component';
import {PersonalAccountComponent} from './personal-account/personal-account.component';
import {TourFormComponent} from './forms/tour-form/tour-form.component';
import {TypeFormComponent} from './forms/type-form/type-form.component';
import {HotelFormComponent} from './forms/hotel-form/hotel-form.component';
import {CountryFormComponent} from './forms/country-form/country-form.component';
import {CityFormComponent} from './forms/city-form/city-form.component';
import {LoginFormComponent} from './forms/login-form/login-form.component';

const routes: Routes = [
  { path: '', component: UserFormComponent },
  { path: 'users', component: UserListComponent },
  { path: 'registration', component: UserFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'tours', component: TourListComponent },
  { path: 'account', component: PersonalAccountComponent },
  { path: 'addtour', component: TourFormComponent },
  { path: 'addtype', component: TypeFormComponent },
  { path: 'addhotel', component: HotelFormComponent },
  { path: 'addcountry', component: CountryFormComponent },
  { path: 'addcity', component: CityFormComponent },
  { path: 'account', component: PersonalAccountComponent },
  { path: '**', component: LoginFormComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
