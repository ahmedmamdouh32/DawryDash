import { Component, inject } from '@angular/core';
import { Button } from '../../../../Components/button/button';

@Component({
  selector: 'app-hero-section',
  imports: [Button],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection { }
