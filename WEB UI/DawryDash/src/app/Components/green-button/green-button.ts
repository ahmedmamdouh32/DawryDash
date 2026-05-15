import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-green-button',
  imports: [],
  templateUrl: './green-button.html',
  styleUrl: './green-button.css',
})
export class GreenButton {
  @Input() innerText: string = '';
  @Input() fontWidth: 'default' | 'bold' = 'default';
}
