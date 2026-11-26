import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root', standalone: true, imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="app-shell">
      <header class="site-header">
        <div class="container nav-inner">
          <a routerLink="/" class="brand" aria-label="Dish Dash Dosh home">DISH <span class="brand-apostrophe">DASH</span> DOSH<span class="brand-dot">.</span></a>
          <nav class="desktop-nav" aria-label="Main navigation">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">About us</a><a routerLink="/kits" routerLinkActive="active">Starter kits</a><a routerLink="/marketplace" routerLinkActive="active">Marketplace</a><a routerLink="/universities" routerLinkActive="active">For universities</a><a routerLink="/iterations" routerLinkActive="active">Our process</a>
          </nav>
          <a class="nav-cta" routerLink="/mobile-flow">Pre-order a kit <span aria-hidden="true">↗</span></a>
          <button class="menu-toggle" type="button" (click)="menuOpen.set(!menuOpen())" [attr.aria-expanded]="menuOpen()" aria-label="Toggle menu">{{ menuOpen() ? 'Close' : 'Menu' }} <span aria-hidden="true">☰</span></button>
        </div>
        @if (menuOpen()) { <nav class="mobile-nav" aria-label="Mobile navigation" (click)="menuOpen.set(false)"><a routerLink="/">About us</a><a routerLink="/kits">Starter kits</a><a routerLink="/marketplace">Marketplace</a><a routerLink="/universities">For universities</a><a routerLink="/iterations">Our process</a><a routerLink="/mobile-flow">Pre-order a kit ↗</a></nav> }
      </header>
      <main><router-outlet /></main>
      <footer class="site-footer"><div class="container footer-inner"><div><a class="brand footer-brand" routerLink="/">DISH <span class="brand-apostrophe">DASH</span> DOSH<span class="brand-dot">.</span></a><p>Good things deserve another beginning.</p></div><div class="footer-links"><a routerLink="/">About us</a><a routerLink="/kits">Starter kits</a><a routerLink="/marketplace">Marketplace</a><a routerLink="/universities">University partnerships</a><a routerLink="/iterations">Our process</a></div><div class="footer-end"><span>Pass it on.</span><small>Concept demo · Illustrative data</small></div></div></footer>
    </div>`
})
export class AppComponent { menuOpen = signal(false); }
