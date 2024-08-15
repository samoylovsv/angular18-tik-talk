import {Component, inject} from '@angular/core';
import {ProfileService} from "../../data/services/profile.service";
import {Profile} from "../../data/interfaces/profile.interface";
import {ProfileCardComponent} from "../../common-ui/profile-card/profile-card.component";
import {ProfileFiltersComponent} from "./profile-filters/profile-filters.component";

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent, ProfileFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  profileService = inject(ProfileService)
  profiles = this.profileService.filteredProfiles

  constructor() {
  }
}
