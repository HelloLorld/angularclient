import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Hotel} from '../../model/hotel.model';
import {HotelService} from '../../service/hotel.service';
import {City} from '../../model/city.model';
import {CityService} from '../../service/city.service';
import CryptoES from 'crypto-es';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.css']
})
export class HotelFormComponent{
  hotel: Hotel;
  hotels: Hotel[];
  cities: City[];
  changeHotel: boolean;
  haveChange: boolean;
  buttonClicked = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService,
    private cityService: CityService
  ) {
    const decrString = CryptoES.AES.decrypt(localStorage.getItem('userId'), 'idForUser').toString(CryptoES.enc.Utf8);
    if (Number(decrString.slice(0, decrString.lastIndexOf('&'))) !== 1) {
      router.navigate(['/login']).then(r => location.reload());
    }
    this.hotel = new Hotel();
    this.changeHotel = false;
    cityService.findAll().subscribe(data => this.cities = data);
    hotelService.findAll().subscribe(data => this.hotels = data);
  }

  addHotel(): void {
    this.hotelService.save(this.hotel).subscribe(result => {
      this.buttonClicked = true;
      location.reload();
    });
  }
  setHotel(): void {
    this.hotelService.change(this.hotel).subscribe(result => {
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
    this.changeHotel = !this.changeHotel;
    this.hotel = new Hotel();
  }

  changeCity(e: any): void {
    const index = e.target.value;
    if (Number(index) !== -1) {
      this.hotel.city = this.cities[index];
    }
    else { this.hotel.city = null; }
  }

  chooseHotel(e: any): void {
    const index = e.target.value;
    if (Number(index) !== -1) {
      this.hotel = this.hotels[index];
    }
    else { this.hotel = new Hotel(); }
  }

  checkCity(): boolean {
    console.log(this.hotel.city != null);
    return this.hotel.city != null;
  }


}
