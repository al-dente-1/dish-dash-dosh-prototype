import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatasetService } from '../../core/dataset.service';
import { ImpactBadgeComponent } from '../../shared/impact-badge.component';

@Component({
  selector: 'app-kits',
  standalone: true,
  imports: [RouterLink, ImpactBadgeComponent],
  styles: [`
    .kit-visual {
      isolation: isolate;
      height: auto;
      aspect-ratio: 16 / 9;
    }

    .kit-visual::before {
      display: none;
    }

    .kit-photo {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      z-index: 0;
    }

    .kit-tag,
    .visual-caption {
      z-index: 2;
    }

    .kit-visual .kit-tag {
      background: var(--green);
      color: #fff;
    }

    .visual-caption {
      color: #fff;
      text-shadow: 0 1px 3px #0008;
    }

    .kit-marketplace-art {
      isolation: isolate;
      height: auto;
      aspect-ratio: 16 / 9;
      place-items: start;
    }

    .kit-marketplace-art::before {
      display: none;
    }

    .kit-marketplace-art .kit-tag {
      position: absolute;
      top: 16px;
      left: 16px;
      z-index: 2;
      background: var(--green);
      color: #fff;
    }
  `],
  template: `
    <div class="page-banner kits-banner">
      <div class="container">
        <div class="eyebrow light">STUDENT ESSENTIALS / PRE-LOVED, RELOVED</div>
        <div class="page-banner-row">
          <div><h1>Good gear.<br><em>Fresh start.</em></h1><p>Two thoughtful kits for the meals you'll make and share.</p></div>
          <div class="banner-scribble">GOOD THINGS<br>GO ROUND <span>↗</span></div>
        </div>
      </div>
    </div>
    <section class="kits-section container">
      <div class="section-heading kits-heading">
        <div><div class="eyebrow">OUR TWO KITS</div><h2>Start with what<br><em>you need.</em></h2></div>
        <p>Choose dinnerware, cookware, or both. Each kit is pre-loved, cleaned and checked for a fresh start.</p>
      </div>
      <div class="kits-grid">
        @for (kit of data.kits; track kit.id) {
          <article class="kit-card">
            <div class="kit-visual" [class]="'kit-visual ' + kit.tone">
              <img class="kit-photo" [src]="kit.image" [alt]="kit.imageAlt" loading="lazy">
              <div class="kit-tag">{{ kit.label }}</div>
            </div>
            <div class="kit-body">
              <div class="kit-title-row"><div><h3>{{ kit.name }}</h3><p>{{ kit.summary }}</p></div></div>
              <app-impact-badge />
              <div class="kit-includes">
                <span>THE KIT FOCUSES ON</span>
                <ul>@for (item of kit.contents; track item) { <li>{{ item }}</li> }</ul>
                <p class="kit-contents-note">Exact items and quantities are confirmed before ordering.</p>
              </div>
              <div class="kit-bottom">
                <button type="button" class="impact-code" (click)="impactOpen.set(impactOpen() === kit.id ? null : kit.id)" [attr.aria-expanded]="impactOpen() === kit.id" title="View circular impact story">
                  <span class="qr-art" aria-hidden="true">▞▚<br>▚▞</span><small>CIRCULAR<br>IMPACT CODE ↗</small>
                </button>
                <a class="button button-dark" routerLink="/mobile-flow" [queryParams]="{ kit: kit.id }">Choose this kit ↗</a>
              </div>
              @if (impactOpen() === kit.id) {
                <div class="impact-story"><strong>Every item gets another chapter.</strong><p>Collected on campus, cleaned and checked, then packed for a new student room. A scannable item history is planned for the live service.</p></div>
              }
            </div>
          </article>
        }
        <a class="kit-marketplace-card" routerLink="/marketplace" aria-label="Explore the campus marketplace">
          <div class="kit-marketplace-art"><img class="kit-photo" src="/images/marketplace.jpeg" alt="Pre-loved marketplace finds with price tags, including a kettle, books, a lava lamp and badminton rackets, on a kitchen table" loading="lazy"><span class="kit-tag">CAMPUS MARKETPLACE</span></div>
          <div class="kit-marketplace-copy"><span class="eyebrow">BEYOND THE KITS</span><h3>Explore the<br><em>marketplace.</em></h3><p>Find individual pre-loved pieces with their own stories, from useful room essentials to unexpected campus treasures.</p><span class="marketplace-cta">Shop marketplace <span aria-hidden="true">↗</span></span></div>
        </a>
      </div>
      <p class="kits-note">Product illustrations are illustrative. Prices and final contents will be shared before any order is placed.</p>
    </section>
    <section class="promise-band"><div class="container promise-grid"><div><span>✳</span><strong>Cleaned and checked</strong><p>Ready for a confident fresh start.</p></div><div><span>⌂</span><strong>Delivered to your room</strong><p>There before your first move-in day.</p></div><div><span>◎</span><strong>A circular story</strong><p>See the difference your choice makes.</p></div></div></section>
  `
})
export class KitsComponent {
  data = inject(DatasetService);
  impactOpen = signal<string | null>(null);
}
