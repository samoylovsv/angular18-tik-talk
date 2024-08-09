import {Component, inject} from '@angular/core';
import {ProfileHeaderComponent} from "../../common-ui/profile-header/profile-header.component";
import {ProfileService} from "../../data/services/profile.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Profile} from "../../data/interfaces/profile.interface";
import {switchMap} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";
import {AsyncPipe, NgForOf} from "@angular/common";
import {SvgIconComponent} from "../../common-ui/svg-icon/svg-icon.component";
import {SubscriberCardComponent} from "../../common-ui/sidebar/subscriber-card/subscriber-card.component";
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileHeaderComponent,
    SvgIconComponent,
    AsyncPipe,
    RouterLink,
    NgForOf,
    SubscriberCardComponent,
    ImgUrlPipe
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  profileService = inject(ProfileService)
  activatedRoute = inject(ActivatedRoute)

  me$ = toObservable(this.profileService.me)

  subscribers$ = this.profileService.getSubscribersShortList(5)

  profile$ = this.activatedRoute.params.pipe(
    switchMap(({id}) => {
      if (id === 'me') {
        return this.me$
      }
      return this.profileService.getAccount(id)
    })
  )
}
