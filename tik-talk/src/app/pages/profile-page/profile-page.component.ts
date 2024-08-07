import {Component, inject} from '@angular/core';
import {ProfileHeaderComponent} from "../../common-ui/profile-header/profile-header.component";
import {ProfileService} from "../../data/services/profile.service";
import {ActivatedRoute} from "@angular/router";
import {Profile} from "../../data/interfaces/profile.interface";
import {switchMap} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    AsyncPipe
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  profileService = inject(ProfileService)
  activatedRoute = inject(ActivatedRoute)

  me$ = toObservable(this.profileService.me)

  profile$ = this.activatedRoute.params.pipe(
    switchMap(({id}) => {
      if (id === 'me') {
        return this.me$
      }
      return this.profileService.getAccount(id)
    })
  )
}
