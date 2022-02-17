import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Type} from '../model/type.model';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private typeUrl: string;

  constructor(private http: HttpClient) {
    this.typeUrl = 'http://localhost:8080/types';
  }

  public findAll(): Observable<Type[]> {
    return this.http.get<Type[]>(this.typeUrl);
  }

  public save(type: Type) {
    return this.http.post<Type>(this.typeUrl, type);
  }

  public change(type: Type) {
    return this.http.put<Type>(this.typeUrl + '/' + type.id, type);
  }
}
