import {Component, inject, OnDestroy} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ProfileService} from "../../../data/services/profile.service";
import {debounceTime, startWith, Subscription, switchMap, takeUntil} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent implements OnDestroy {
  fb = inject(FormBuilder)
  profileService = inject(ProfileService)

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: ['']
  })

  searchFormSubs: Subscription

  constructor() {
    this.searchFormSubs = this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(300),
        switchMap(formValue => {
          return this.profileService.filterProfiles(formValue)
        }),
        // takeUntilDestroyed() // from Angular 17
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.searchFormSubs.unsubscribe()
  }

}
