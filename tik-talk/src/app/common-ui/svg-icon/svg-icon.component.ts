import {Component, Input} from '@angular/core';

@Component({
  selector: 'svg[icon]',
  standalone: true,
  imports: [],
  templateUrl: './svg-icon.component.html',
  styleUrl: './svg-icon.component.scss'
})
export class SvgIconComponent {
  @Input() icon: string = ''

  get href(): string {
    return `/assets/images/svg/${this.icon}.svg#${this.icon}`
  }
}
