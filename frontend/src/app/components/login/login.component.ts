import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <form [formGroup]="form" (ngSubmit)="login()" class="p-4">
      <input formControlName="username" placeholder="Username" class="border p-2 mb-2"/>
      <input type="password" formControlName="password" placeholder="Password" class="border p-2 mb-2"/>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2">Login</button>
    </form>
  `
})
export class LoginComponent {
  form = this.fb.group({
    username: '',
    password: ''
  });

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  login() {
    this.auth.login(this.form.value).subscribe();
  }
}
