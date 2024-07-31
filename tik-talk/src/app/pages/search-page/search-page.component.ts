import {Component, inject} from '@angular/core';
import {ProfileService} from "../../data/services/profile.service";
import {Profile} from "../../data/interfaces/profile.interface";
import {ProfileCardComponent} from "../../common-ui/profile-card/profile-card.component";

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  profileService = inject(ProfileService)
  profiles: Profile[] = []

  constructor() {
    this.profileService.gerTestAccounts()
      .subscribe(value => {
        this.profiles = value
      })
  }
}
