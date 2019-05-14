import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Checklist } from '../models/checklist';
import { ChecklistService } from '../services/checklist.service';

@Component({
  selector: 'app-user-checklist-view',
  templateUrl: './user-checklist-view.component.html',
  styleUrls: ['./user-checklist-view.component.css']
})
export class UserChecklistViewComponent implements OnInit {
  role: string;
  checklist: Checklist = {role: '', sections: []};
  constructor(private route: ActivatedRoute, private checklistService: ChecklistService) {
    this.role = this.route.snapshot.paramMap.get('role');
    this.checklistService.getUserChecklist(localStorage.getItem('id_token'), this.role).subscribe((retrievedChecklist) => {
      this.checklist = retrievedChecklist.checklist;
      console.log(this.checklist);
    });
   }

  ngOnInit() {
  }

}
