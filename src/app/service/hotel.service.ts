import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Hotel} from '../model/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private hotelUrl: string;

  constructor(private http: HttpClient) {
    this.hotelUrl = 'http://localhost:8080/hotels';
  }

  public findAll(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.hotelUrl);
  }

  public save(hotel: Hotel): Observable<Hotel> {
    return this.http.post<Hotel>(this.hotelUrl, hotel);
  }

  public change(hotel: Hotel): Observable<Hotel> {
    return this.http.patch<Hotel>(this.hotelUrl + '/' + hotel.id, hotel);
  }
}
