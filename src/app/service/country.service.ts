import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Country} from '../model/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private countryUrl: string;

  constructor(private http: HttpClient) {
    this.countryUrl = 'http://localhost:8080/countries';
  }

  public findAll(): Observable<Country[]> {
    return this.http.get<Country[]>(this.countryUrl);
  }

  public save(country: Country) {
    return this.http.post<Country>(this.countryUrl, country);
  }

  public change(country: Country) {
    return this.http.put<Country>(this.countryUrl + '/' + country.id, country);
  }
}
