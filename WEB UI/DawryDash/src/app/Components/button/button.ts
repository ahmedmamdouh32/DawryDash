import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() innerText: string = '';

  @Input() variant: 'green' | 'gray' = 'green';

  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  @Input() customClass: string = '';
}
