import { NgClass } from '@angular/common';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {

  constructor(private router: Router) { }
  @Input() type: 'button' | 'submit' = 'button';

  @Input() routerLink: string | null = null;

  @Input() variant: 'green' | 'gray' = 'green';

  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  @Input() customClass: string = '';

  @Output() btnClick = new EventEmitter<void>();

  onBtnPress() {

    if (this.routerLink) {

      this.router.navigate([this.routerLink]);

    }
    else {
      this.btnClick.emit();
    }
    //write the remaining logic of the button press here

  }


}
