import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
// This service will contain all the API calls we make for a trainer
export class TrainerService {

  constructor(private http: HttpClient) { }
  
  getAllUserChecklists(userId: number) {
    return this.http.post<any>('http://localhost:3000/trainer/user/checklists', {id: userId});
  }

  getUserChecklist(userId: number, roleAbbr: string) {
    return this.http.post<any>('http://localhost:3000/trainer/user/checklist', {id: userId, role: roleAbbr});
  }
  
  signItem(userToken: string, item: any) {
    const payload = {token: userToken, comments: item.comments, itemId: item.itemId, status: item.status};
    return this.http.post<any>('http://localhost:3000/trainer/checklist/signItem', payload);
  }
}
