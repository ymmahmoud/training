import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'angularx-social-login';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  verifyUser(userToken: string): Observable<any> {
    return this.http.post('http://localhost:3000/user/verify', {token: userToken});
  }

  createUser(id: string): Observable<any> {
    return this.http.post('http://localhost:3000/user/create', {id});
  }

  getAllUsers() {
    return this.http.get('http://localhost:3000/user/all');
  }

  getUserIdToken() {
    return this.authService.authState.pipe(map((user) => {
      if (user) {
        return user.idToken;
      } else {
        return null;
      }
    }));
  }
}
