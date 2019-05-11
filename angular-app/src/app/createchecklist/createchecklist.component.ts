import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn} from '@angular/forms';
import { Checklist } from '../models/checklist';
import { ChecklistService } from '../services/checklist.service';

@Component({
  selector: 'app-createchecklist',
  templateUrl: './createchecklist.component.html',
  styleUrls: ['./createchecklist.component.css']
})
export class CreatechecklistComponent implements OnInit {
  createChecklistForm: FormGroup;
  alert: any = {class: '', message: ''};
  roles = [
    {val: 'ees', name: 'Emergency Event Supervisor'},
    {val: 'cct', name: 'Crew Chief Trainer'},
    {val: 'cc', name: 'Crew Chief'},
    {val: 'pcc', name: 'Probationary Crew Chief'},
    {val: 'frcc', name: 'First Response Crew Chief'},
    {val: 'dt', name: 'Driver Trainer'},
    {val: 'd', name: 'Driver'},
    {val: 'pd', name: 'Probationary Driver'},
    {val: 'a', name: 'Attendant'}
  ];
  constructor(private fb: FormBuilder, private checklistService: ChecklistService) {
    this.createChecklistForm = this.fb.group({
      role: ['', Validators.required],
      items: this.fb.array([]),
    });
    this.createItemControl();
  }

  ngOnInit() {
  }

  createItemControl(): void {
    (this.createChecklistForm.controls.items as FormArray).push(new FormControl('', Validators.required));
  }

  removeItem(index: number): void {
    (this.createChecklistForm.controls.items as FormArray).removeAt(index);
  }

  onSubmit(): void {
    const role = this.createChecklistForm.controls.role.value;
    const items = (this.createChecklistForm.controls.items as FormArray).controls.map(item => item.value);
    const submittedChecklist: Checklist = new Checklist(role, items);
    this.checklistService.createChecklist(submittedChecklist).subscribe((response) => {
      console.log(response);
      /* tslint:disable:no-string-literal */
      // Constructs the alert object to display to the user
      if (response['success'] ) {
        this.alert = {class: 'alert alert-success', message: response['msg']};
      } else {
        this.alert = {class: 'alert alert-danger', message: response['msg']};
      }
      /* tslint:enable:no-string-literal */
    });
  }
}
