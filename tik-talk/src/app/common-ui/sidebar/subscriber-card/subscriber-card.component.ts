import {Component, Input} from '@angular/core';
import {Profile} from "../../../data/interfaces/profile.interface";
import {ImgUrlPipe} from "../../../helpers/pipes/img-url.pipe";
import {SvgIconComponent} from "../../svg-icon/svg-icon.component";

@Component({
  selector: 'app-subscriber-card',
  standalone: true,
  imports: [
    ImgUrlPipe,
    SvgIconComponent
  ],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss'
})
export class SubscriberCardComponent {
  @Input() profile!: Profile | null
  @Input() icon: string | null | undefined
}
