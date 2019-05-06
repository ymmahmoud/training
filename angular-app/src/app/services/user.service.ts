import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // We should switch this out with a Observable<User> once we know more about the user object
  getInfo(userID: string): Observable<any> {
    return this.http.post('http://localhost:3000/user/info', {id: userID});
  }
}
