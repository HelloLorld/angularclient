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
  haveChange: boolean;
  buttonClicked = false;

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
    this.countryService.change(this.country).subscribe(result => {
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
    this.changeCountry = !this.changeCountry;
    this.country = new Country();
  }

  chooseCountry(e: any): void {
    const index = e.target.value;
    if (Number(index) !== -1) {
      this.country = this.countries[index];
    }
    else {
      this.country = new Country();
    }
  }

}
