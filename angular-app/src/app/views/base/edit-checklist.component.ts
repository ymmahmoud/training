import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn} from '@angular/forms';
import { Checklist } from '../../models/checklist';
import { ChecklistService } from '../../services/checklist.service';

@Component({
  selector: 'app-edit-checklist',
  templateUrl: './edit-checklist.component.html',
  styleUrls: ['./edit-checklist.component.scss']
})

export class EditChecklistComponent implements OnInit {
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
      sections: this.fb.array([]),
    });
  }

  ngOnInit() {
  }

  addSection(): void {
    const section: FormGroup = this.fb.group({
      title: ['', Validators.required],
      items: this.fb.array([this.fb.control('', Validators.required)])
    });
    (this.createChecklistForm.controls.sections as FormArray).push(section);
    const control = new FormControl(section.length, Validators.min(1));
  }
  // Adds an item to the section based on index
  addItem(index: number): void {
    const sections = (this.createChecklistForm.controls.sections as FormArray).controls as Array<FormGroup>;
    const currentItems = sections[index].controls.items as FormArray;
    currentItems.push(new FormControl('', Validators.required));
  }

  // Removes the item from that particular section
  removeSection(sectionIndex: number): void {
    const sections = (this.createChecklistForm.controls.sections as FormArray);
    sections.removeAt(sectionIndex);
  }

  // Removes that item from the particular section
  removeItem(sectionIndex: number, itemIndex: number): void {
    const sections = (this.createChecklistForm.controls.sections as FormArray).controls as Array<FormGroup>;
    const currentItems = sections[sectionIndex].controls.items as FormArray;
    currentItems.removeAt(itemIndex);
  }

  onSubmit(): void {
    const role = this.createChecklistForm.controls.role.value;
    const formSections = (this.createChecklistForm.controls.sections as FormArray).controls as Array<FormGroup>;
    const checklistSections = [];
    // A bunch of magic to get the forms inputs into a nice checklist object
    for (const formSection of formSections) {
      const checklistSection = {name: formSection.controls.title.value, items: []};
      const items = (formSection.controls.items as FormArray).controls as Array<FormControl>;
      for (const item of items){
        checklistSection.items.push(item.value);
      }
      checklistSections.push(checklistSection);
    }
    const submittedChecklist = new Checklist(role, checklistSections);
    this.checklistService.createChecklist(submittedChecklist).subscribe((response) => {
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
