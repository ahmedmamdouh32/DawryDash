import { Component } from '@angular/core';
import { HeroSection } from './Components/hero-section/hero-section';
import { FeaturesSection } from './Components/features-section/features-section';
import { TournamentsSection } from './Components/tournaments-section/tournaments-section';
import { LiveMatchesSection } from './Components/live-matches-section/live-matches-section';

@Component({
  selector: 'app-landing-page',
  imports: [HeroSection, FeaturesSection, TournamentsSection, LiveMatchesSection],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage { }
