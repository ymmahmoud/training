import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
// This service will contain all the API calls we make for a trainer
export class TrainerService {

  constructor(private http: HttpClient) { }
  
  getAllUserChecklists(userId: number) {
    return this.http.post<any>('http://localhost:3000/trainer/checklists', {id: userId});
  }
}
