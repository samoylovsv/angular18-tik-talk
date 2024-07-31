import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  form = new FormGroup({
    username: new FormControl(null),
    password: new FormControl(null)
  })

  onSubmit(): void {
    console.log(this.form.value)
  }

}
