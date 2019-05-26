import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private http: HttpClient) { }

  roleNameToAbbr(name: string) {
    const encodedName = encodeURIComponent(name);
    return this.http.get<any>(`http://localhost:3000/role/abbreviation?name=${encodedName}`);
  }
}
