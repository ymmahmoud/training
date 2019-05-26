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
  checklistViews: any[] = [];

  constructor(private checklistService: ChecklistService, private helperService: HelperService) {}

  ngOnInit(): void {
    this.checklistService.getAllUserChecklists(localStorage.getItem('id_token')).subscribe((response) => {
      this.checklists = response.checklists as Checklist[];
      this.createChecklistView(this.checklists).then((newViews) => this.checklistViews = newViews);
    });
  }

  async createChecklistView(checklists: Checklist[]) {
    const checklistViews: any = [];
    for (const checklist of checklists) {
      const checklistView: any = {name: checklist.role, sections: []};
      let itemCount = 0;
      let completeCount = 0;
      this.helperService.roleNameToAbbr(checklist.role).subscribe((res) => {
        checklistView.abbr = res.abbr;
        for (const section of checklist.sections) {
          let sectionStatus = 0;
          for (const item of section.items) {
            sectionStatus = Math.min(item.status, sectionStatus);
            // If an item is complete add to complete ocunt
            completeCount += item.status == 2 ? 1 : 0;
            itemCount++;
          }
          checklistView.sections.push({name: section.name, status: this.checklistService.itemStatusToString(sectionStatus)});
        }
        checklistView.progress = (completeCount / itemCount) * 100;
        checklistViews.push(checklistView);
      });
    }
    console.log(checklistViews);
    return checklistViews;
  }
}
