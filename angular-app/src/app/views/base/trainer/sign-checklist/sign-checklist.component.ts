import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChecklistService } from '../../../../services/checklist.service';
import { TrainerService } from '../../../../services/trainer.service';
import { Checklist } from '../../../../models/checklist';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {SignItemModalComponent} from '../sign-item-modal/sign-item-modal.component';

@Component({
  selector: 'app-sign-checklist',
  templateUrl: './sign-checklist.component.html',
  styleUrls: ['./sign-checklist.component.scss']
})
export class SignChecklistComponent implements OnInit {

  checklist: Checklist = new Checklist('',[]);
  bsModalRef: BsModalRef;

  constructor(private route: ActivatedRoute, 
    private trainerService: TrainerService,
    private modalService: BsModalService,
    private checklistService: ChecklistService) { 
    }

  ngOnInit() {
    const viewedUserId = this.route.snapshot.paramMap.get('id') as unknown as number;
    const viewedRole = this.route.snapshot.paramMap.get('role') as string;
    this.trainerService.getUserChecklist(viewedUserId, viewedRole).subscribe((resp) => {
      if (resp.success) {
        this.checklist = resp.checklist;
        console.log(this.checklist);
      }
    });
  }

  editItem(sectionIndex, itemIndex) {
    const initialState = {
      item: this.checklist.sections[sectionIndex].items[itemIndex],
      index: [sectionIndex, itemIndex]
    }
    this.bsModalRef = this.modalService.show(SignItemModalComponent, {initialState});
    this.modalService.onHide.subscribe((reason: string) => {
      this.checklist.sections[this.bsModalRef.content.index[0]].items[this.bsModalRef.content.index[1]] = this.bsModalRef.content.item;
    });
  }
}
