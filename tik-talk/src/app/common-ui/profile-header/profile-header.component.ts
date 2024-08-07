import {Component, input} from '@angular/core';
import {Profile} from "../../data/interfaces/profile.interface";
import {SubscriberCardComponent} from "../sidebar/subscriber-card/subscriber-card.component";

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [
    SubscriberCardComponent
  ],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss'
})
export class ProfileHeaderComponent {
  profile=input<Profile>()
}
