import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ChecklistService } from '../../services/checklist.service';
import { HelperService } from '../../services/helper.service';
import { Checklist } from '../../models/checklist';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  checklists: Checklist[] = [];
  rows: any[] = [];

  constructor(private checklistService: ChecklistService, private helperService: HelperService) {}

  ngOnInit(): void {
    this.checklistService.getAllUserChecklists(localStorage.getItem('id_token')).subscribe(async (response) => {
      this.checklists = response.checklists as Checklist[];
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
      console.log(this.rows);
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
    return Promise.resolve(checklistViews);
  }
}
