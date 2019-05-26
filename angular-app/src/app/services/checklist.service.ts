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

  itemStatusToString(status: number) {
    switch(status) {
      case (0):
        return "Incomplete";
      case (1):
        return "In Progress";
      case (2):
        return "Complete";
    }
  }
}
