import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainerService } from '../../../../services/trainer.service';
import { HelperService } from '../../../../services/helper.service';
import { ChecklistService } from '../../../../services/checklist.service';
import { Checklist } from '../../../../models/checklist';

@Component({
  selector: 'app-checklistmanager',
  templateUrl: './checklistmanager.component.html',
  styleUrls: ['./checklistmanager.component.scss']
})
export class ChecklistmanagerComponent implements OnInit {
  checklists: Checklist[] = [];
  rows: any[] = [];
  viewedUserId = -1;

  constructor(private route: ActivatedRoute, private trainerService: TrainerService, 
    private helperService: HelperService, private checklistService: ChecklistService) { }

  ngOnInit() {
    this.viewedUserId = this.route.snapshot.paramMap.get('id') as unknown as number;
    this.trainerService.getAllUserChecklists(this.viewedUserId).subscribe(async (checklists) => {
      this.checklists = checklists.checklists as Checklist[];
      const newViews = await this.createChecklistView(this.checklists);
      let row: any[] = [];
      // Every 3 checklists get put on a new row
      for (let i = 0; i < newViews.length; i++) {
        if (i % 3 === 0 && i !== 0) {
          this.rows.push(row);
          row = [];
        }
        row.push(newViews[i]);
      }
      this.rows.push(row);
    });
  }

  async createChecklistView(checklists: Checklist[]): Promise<any[]> {
    const checklistViews: any = [];
    for (const checklist of checklists) {
      const checklistView: any = {name: checklist.role, sections: []};
      let itemCount = 0;
      let completeCount = 0;
      const res = await this.helperService.roleNameToAbbr(checklist.role).toPromise();
      checklistView.abbr = res.abbr;
      for (const section of checklist.sections) {
        let sectionItemCount = 0;
        let sectionStatusTotal = 0;
        for (const item of section.items) {
          sectionItemCount++;
          sectionStatusTotal += item.status;
          // If an item is complete add to complete count
          completeCount += item.status == 2 ? 1 : 0;
          itemCount++;
        }
        let sectionStatus = sectionStatusTotal / sectionItemCount;
        if (sectionStatus != 0 && sectionStatus != 2) sectionStatus = 1;
        checklistView.sections.push({name: section.name, status: this.checklistService.itemStatusToBadge(sectionStatus)});
      }
      checklistView.progress = (completeCount / itemCount) * 100;
      checklistViews.push(checklistView);
    }
    return checklistViews;
  }

}
