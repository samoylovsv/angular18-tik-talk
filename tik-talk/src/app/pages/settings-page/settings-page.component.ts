import {Component, effect, inject} from '@angular/core';
import {ProfileHeaderComponent} from "../../common-ui/profile-header/profile-header.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProfileService} from "../../data/services/profile.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    ReactiveFormsModule
  ],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss'
})
export class SettingsPageComponent {
  fb = inject(FormBuilder)
  profileService = inject(ProfileService)

  form = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    username: [{value: null, disabled: true}, Validators.required],
    description: [null],
    stack: [null]
  })

  constructor() {
    effect(() => {
      // @ts-ignore
      return this.form.patchValue(this.profileService.me());
    });
  }

  onSave(): void {
    this.form.markAllAsTouched()
    this.form.updateValueAndValidity()
    if (this.form.invalid) {
      return
    }

    firstValueFrom(
      this.profileService.patchProfile(this.form.value)
    )
  }
}
