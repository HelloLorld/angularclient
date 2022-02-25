import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CountryService} from '../../service/country.service';
import {Country} from '../../model/country.model';
import CryptoES from 'crypto-es';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.css']
})
export class CountryFormComponent {
  country: Country;
  countries: Country[];
  changeCountry: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryService: CountryService
  ) {
    const decrString = CryptoES.AES.decrypt(localStorage.getItem('userId'), 'idForUser').toString(CryptoES.enc.Utf8);
    if (Number(decrString.slice(0, decrString.lastIndexOf('&'))) !== 1) {
      router.navigate(['/login']).then(r => location.reload());
    }
    this.changeCountry = false;
    countryService.findAll().subscribe(data => this.countries = data);
    this.country = new Country();
  }

  addCountry(): void {
    this.countryService.save(this.country).subscribe(result => {
      location.reload();
    });
  }

  setCountry(): void {
    this.countryService.change(this.country).subscribe(result => location.reload());
  }

  change(): void {
    this.changeCountry = !this.changeCountry;
  }

  chooseCountry(e: any): void {
    const index = e.target.value;
    console.log(index);
    if (Number(index) !== -1) {
      this.country = this.countries[index];
    }
    else {
      this.country = new Country();
    }
  }

}
