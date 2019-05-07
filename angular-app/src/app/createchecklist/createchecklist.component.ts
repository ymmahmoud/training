import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn} from '@angular/forms';
import { Checklist } from '../models/checklist';

@Component({
  selector: 'app-createchecklist',
  templateUrl: './createchecklist.component.html',
  styleUrls: ['./createchecklist.component.css']
})
export class CreatechecklistComponent implements OnInit {
  createChecklistForm: FormGroup;
  roles = [
    {val: 'ds', name: 'Duty Supervisor'},
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
  constructor(private fb: FormBuilder) {
    this.createChecklistForm = this.fb.group({
      title: ['', Validators.required],
      items: this.fb.array([]),
      roles: this.fb.array([], minSelectedCheckboxes(1))
    });
    this.createItemControl();
    this.addCheckboxes();
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
    console.log(this.createChecklistForm);
    const title = this.createChecklistForm.controls.title.value;
    const checkboxes = (this.createChecklistForm.controls.roles as FormArray).controls;
    const selectedRoles = [];
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].value) {
        selectedRoles.push(this.roles[i].val);
      }
    }
    const items = (this.createChecklistForm.controls.items as FormArray).controls.map(item => item.value);
    const checklist = new Checklist(title, items, selectedRoles);
    // Server request goes here
    console.log(checklist);
  }

  private addCheckboxes(): void {
    this.roles.map((o, i) => {
      (this.createChecklistForm.controls.roles as FormArray).push(new FormControl(false));
    });
  }
}

// Thanks to https://coryrylan.com/blog/creating-a-dynamic-checkbox-list-in-angular for this validator
function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
      .map(control => control.value)
      // total up the number of checked checkboxes
      .reduce((prev, next) => next ? prev + next : prev, 0);

    // if the total is not greater than the minimum, return the error message
    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}