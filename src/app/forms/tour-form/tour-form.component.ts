import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TourService} from '../../service/tour.service';
import {Tour} from '../../model/tour.model';
import {TypeService} from '../../service/type.service';
import {Hotel} from '../../model/hotel.model';
import {HotelService} from '../../service/hotel.service';
import {Type} from '../../model/type.model';
import CryptoES from 'crypto-es';

@Component({
  selector: 'app-tour-form',
  templateUrl: './tour-form.component.html',
  styleUrls: ['./tour-form.component.css']
})
export class TourFormComponent {
  tour: Tour;
  tours: Tour[];
  types: Type[];
  hotels: Hotel[];
  changeTour: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tourService: TourService,
    private typeService: TypeService,
    private hotelService: HotelService
  ) {
    if (Number(CryptoES.AES.decrypt(localStorage.getItem('userId'), 'idForUser').toString(CryptoES.enc.Utf8)
      .slice(0, 1)) !== 1) {
      router.navigate(['/login']).then(r => location.reload());
    }
    this.tour = new Tour();
    this.tour.hotel = null;
    this.tour.type = null;
    this.changeTour = false;
    typeService.findAll().subscribe(data => this.types = data);
    hotelService.findAll().subscribe(data => this.hotels = data);
    tourService.findAll().subscribe(data => this.tours = data);
  }

  addTour(): void {
    this.tourService.save(this.tour).subscribe(result => {
      this.goToTourList();
    });
  }

  setTour(): void {
    this.tourService.change(this.tour).subscribe(result => {
      this.goToTourList();
    });
  }

  chooseTour(e: any): void {
    const index = e.target.value;
    console.log(index);
    if (Number(index) !== -1) {
      this.tour = this.tours[index];
    }
    else {
      this.tour = new Tour();
    }
  }

  change(): void {
    this.changeTour = !this.changeTour;
  }

  changeHotel(e: any): void {
    const index = e.target.value;
    console.log(index);
    if (index !== -1) {
    this.tour.hotel = this.hotels[index];
    }
    else { this.tour.hotel = null; }
  }

  changeType(e: any): void {
    const index = e.target.value;
    console.log(index);
    if (index !== -1) {
      this.tour.type = this.types[index];
    }
    else { this.tour.type = null; }
  }

  goToTourList(): void {
    this.router.navigate(['/tours']);
  }

  checkType(): boolean {
    if (this.tour.type == null) { return false; }
    else { return true; }
  }

  checkHotel(): boolean {
    if (this.tour.hotel == null) { return false; }
    else { return true; }
  }

  checkTour(): boolean {
    if (!this.checkHotel() || !this.checkType()) { return false; }
    else { return true; }
  }
}
