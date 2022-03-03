import { Component } from '@angular/core';
import {City} from '../../model/city.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CityService} from '../../service/city.service';
import {Country} from '../../model/country.model';
import {CountryService} from '../../service/country.service';
import CryptoES from 'crypto-es';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.css']
})
export class CityFormComponent {
  city: City;
  cities: City[];
  countries: Country[];
  changeCity: boolean;
  haveChange: boolean;
  buttonClicked = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryService: CountryService,
    private cityService: CityService
  ) {
    const decrString = CryptoES.AES.decrypt(localStorage.getItem('userId'), 'idForUser').toString(CryptoES.enc.Utf8);
    if (Number(decrString.slice(0, decrString.lastIndexOf('&'))) !== 1) {
      router.navigate(['/login']).then(r => location.reload());
    }
    this.changeCity = false;
    this.city = new City();
    countryService.findAll().subscribe(data => {
      this.countries = data;
      this.countries.sort((a, b) => {
        if (a.name > b.name) { return 1; }
        if (a.name < b.name) { return -1; }
        return 0;
      });
    });
    cityService.findAll().subscribe(data => {
      this.cities = data;
      this.cities.sort((a, b) => {
        if (a.name > b.name) { return 1; }
        if (a.name < b.name) { return -1; }
        return 0;
      });
    });
  }

  addCity(): void {
    this.cityService.save(this.city).subscribe(result => {
      location.reload();
    });
  }

  setChanges(): void {
    this.cityService.change(this.city).subscribe( result => {
      this.buttonClicked = true;
      if (result != null) {
        this.haveChange = true;
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
      else {
        this.haveChange = false;
        setTimeout(() => {
          this.buttonClicked = false;
        }, 2000);
      }
    });
  }

  change(): void {
    this.changeCity = !this.changeCity;
    this.city = new City();
  }

  changeCountry(e: any): void {
    const index = e.target.value;
    if (Number(index) !== -1) {
      this.city.country = this.countries[index];
    }
    else { this.city.country = null; }
  }

  chooseCity(e: any): void {
    const index = e.target.value;
    if (Number(index) !== -1) {
      this.city = this.cities[index];
    }
    else {
      this.city = new City();
    }
  }

  checkCity(): boolean {
    return this.city.country != null;
  }

}
