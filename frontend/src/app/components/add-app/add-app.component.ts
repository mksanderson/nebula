import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-add-app',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="p-4">
      <input formControlName="name" placeholder="Name" class="border p-2 mb-2"/>
      <input formControlName="link" placeholder="Link" class="border p-2 mb-2"/>
      <input formControlName="title" placeholder="Title" class="border p-2 mb-2"/>
      <textarea formControlName="description" placeholder="Description" class="border p-2 mb-2"></textarea>
      <button type="submit" class="bg-green-500 text-white px-4 py-2">Submit</button>
    </form>
  `
})
export class AddAppComponent {
  form = this.fb.group({
    name: '',
    link: '',
    title: '',
    description: ''
  });

  constructor(private fb: FormBuilder, private apps: AppService) {}

  submit() {
    this.apps.addApp(this.form.value).subscribe();
  }
}
