import { NgClass } from '@angular/common';
import { Component, input, Input } from '@angular/core';
@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  @Input() variant: 'green' | 'gray' = 'green';

  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  @Input() customClass: string = '';
}
