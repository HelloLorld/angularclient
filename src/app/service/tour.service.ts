import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tour} from '../model/tour.model';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private tourUrl: string;

  constructor(private http: HttpClient) {
    this.tourUrl = 'http://localhost:8080/tours';
  }

  public findAll(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.tourUrl);
  }

  public save(tour: Tour): Observable<Tour> {
    return this.http.post<Tour>(this.tourUrl, tour);
  }

  public change(tour: Tour): Observable<Tour> {
    return this.http.patch<Tour>(this.tourUrl + '/' + tour.id, tour);
  }
}
