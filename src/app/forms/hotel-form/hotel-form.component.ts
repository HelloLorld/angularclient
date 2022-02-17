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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService,
    private cityService: CityService
  ) {
    if (Number(CryptoES.AES.decrypt(localStorage.getItem('userId'), 'idForUser').toString(CryptoES.enc.Utf8)
      .slice(0, 1)) !== 1) {
      router.navigate(['/login']).then(r => location.reload());
    }
    this.hotel = new Hotel();
    this.changeHotel = false;
    cityService.findAll().subscribe(data => this.cities = data);
    hotelService.findAll().subscribe(data => this.hotels = data);
  }

  addHotel(): void {
    this.hotelService.save(this.hotel).subscribe(result => {
      location.reload();
    });
  }
  setHotel(): void {
    this.hotelService.change(this.hotel).subscribe(result => {
      location.reload();
    });
  }

  change(): void {
    this.changeHotel = !this.changeHotel;
  }

  changeCity(e: any): void {
    const index = e.target.value;
    console.log(index);
    if (Number(index) !== -1) {
      this.hotel.city = this.cities[index];
    }
    else { this.hotel.city = null; }
  }

  chooseHotel(e: any): void {
    const index = e.target.value;
    console.log(index);
    if (Number(index) !== -1) {
      this.hotel = this.hotels[index];
    }
    else { this.hotel = new Hotel(); }
  }

  checkCity(): boolean {
    if (this.hotel.city == null) { return false; }
    else { return true; }
  }


}
