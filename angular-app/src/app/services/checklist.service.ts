import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Checklist } from '../models/checklist';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(private http: HttpClient) { }

  createChecklist(checklist: Checklist) {
    return this.http.post('http://localhost:3000/checklist/create', checklist);
  }

  getUserChecklist(userToken: string, credentialAbbr: string): Observable<any> {
    return this.http.post<any>('http://localhost:3000/checklist/user', {token: userToken, credential: credentialAbbr});
  }

  getAllUserChecklists(userToken: string) {
    return this.http.post<any>('http://localhost:3000/checklist/user-all', {token: userToken});
  }

  itemStatusToBadge(status: number) {
    switch(status) {
      case (0):
        return {class: "badge badge-danger", text: "Incomplete"};
      case (1):
        return {class: "badge badge-warning", text: "In Progress"};
      case (2):
        return {class: "badge badge-success", text: "Complete"};
    }
  }
}
