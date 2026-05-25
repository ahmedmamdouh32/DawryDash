import { Component } from '@angular/core';
import { HeroSection } from './hero-section/hero-section';
import { FeaturesSection } from './features-section/features-section';
import { LiveMatchesSection } from './live-matches-section/live-matches-section';
import { TournamentsSection } from './tournaments-section/tournaments-section';


@Component({
  selector: 'app-landing-page',
  imports: [HeroSection, FeaturesSection, TournamentsSection, LiveMatchesSection],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage { }
