import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from '../../../../services/user.service';
import { TrainerService } from '../../../../services/trainer.service';

@Component({
  selector: 'app-sign-item-modal',
  templateUrl: './sign-item-modal.component.html',
  styleUrls: ['./sign-item-modal.component.scss']
})
export class SignItemModalComponent implements OnInit {
  title: string = "Modify Item";
  item: any;
  closeBtnName: string = "Save & Close";
  editItemForm: FormGroup;
  index: number[];
  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder,
    private userService: UserService, private trainerService: TrainerService) {
   }

  ngOnInit() {
    this.editItemForm = this.fb.group({
      status: [this.item.status],
      comments: [this.item.comments]
    });
  }

  closeModal() {
    const oldStatus = this.item.status;
    const oldComments = this.item.comments;
    this.item.status = this.editItemForm.value.status; 
    this.item.comments = this.editItemForm.value.comments;
    this.userService.getUserIdToken().subscribe(async (token) => {
      // If they don't change anything we don't update
      if (this.item.status != oldStatus || this.item.comments != oldComments) {
        const resp = await this.trainerService.signItem(token, this.item).toPromise();
        if (this.item.status != 0) {
          const trainer = await this.userService.getUserInfo(token).toPromise();
          this.item.trainer = trainer.user.name.fullName;
        }else {
          this.item.trainer = null;
        }
      }
      this.bsModalRef.hide();
    });
  }
}
