import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Checklist } from '../models/checklist';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(private http: HttpClient) { }

  createChecklist(checklist: Checklist) {
    return this.http.post('http://localhost:3000/checklist/create', checklist);
  }
}
