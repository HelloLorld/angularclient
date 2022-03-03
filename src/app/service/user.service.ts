import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8080/users';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  public getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.url + '/' + id);
  }

  public getUserByEmail(loginInfo: Map<string, string>): Observable<object> {
    const jsonObject = {};
    loginInfo.forEach((value, key) => {
      jsonObject[key] = value;
    });
    return this.http.post<object>(this.url.slice(0, 21) + '/login', jsonObject);
  }

  public save(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  public change(user: User): Observable<User> {
    return this.http.patch<User>(this.url + '/' + user.id, user);
  }
}
