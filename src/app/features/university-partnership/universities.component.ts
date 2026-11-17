import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-universities',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page-banner universities-banner"><div class="container">
      <div class="eyebrow light">FOR UNIVERSITY ACCOMMODATION TEAMS</div>
      <div class="page-banner-row"><div><h1>Make move-out<br><em>move things forward.</em></h1><p>A circular route for useful student essentials, from collection to a confident new arrival.</p><a routerLink="/dashboard" class="button button-gold university-hero-button">Explore the dashboard demo ↗</a></div><div class="university-hero-mark" aria-hidden="true">↗<span>COLLECT<br>CARE<br>REUSE</span></div></div>
    </div></section>
    <section class="university-intro container"><div class="eyebrow">THE PARTNERSHIP IDEA</div><div class="university-intro-grid"><h2>A better handover<br><em>for every term.</em></h2><p>Accommodation teams handle a predictable surge of useful items at move-out, while new students need affordable essentials at move-in. Dish Dash Dosh connects those moments through collection, careful checking, and planned delivery.</p></div></section>
    <section class="university-process"><div class="container"><div class="eyebrow">HOW IT COULD WORK</div><h2>One joined-up<br><em>campus cycle.</em></h2><div class="university-process-grid"><article><span>01 / COLLECT</span><div class="process-symbol">⌂</div><h3>Make giving back easy.</h3><p>Set up clear collection points when residents leave, so reusable essentials can be logged for another life.</p></article><article><span>02 / CARE</span><div class="process-symbol">✳</div><h3>Check every handover.</h3><p>Sort and clean suitable items, with relevant condition and safety information captured along the way.</p></article><article><span>03 / DELIVER</span><div class="process-symbol">◎</div><h3>Welcome students in.</h3><p>Offer Dinnerware and Cookware Kits with delivery options that fit the accommodation move-in plan.</p></article></div></div></section>
    <section class="university-assurance container"><div class="assurance-visual" aria-hidden="true"><div class="assurance-paper"><span>DISH DASH DOSH / CAMPUS</span><strong>From surplus<br>to fresh start.</strong><div><i></i><i></i><i></i></div><small>COLLECTED · CHECKED · READY</small></div></div><div class="assurance-copy"><div class="eyebrow">VISIBILITY FOR YOUR TEAM</div><h2>See the care<br><em>behind the numbers.</em></h2><p>The partner dashboard concept brings collection phases, impact estimates, and audit records into one place. It is designed to help accommodation teams follow progress through the term.</p><ul><li>Collection and delivery timeline</li><li>Illustrative reuse metrics</li><li>Check and compliance record previews</li></ul><a routerLink="/dashboard" class="button button-dark">View dashboard demo ↗</a><small>Dashboard figures and records are illustrative concept data.</small></div></section>
  `
})
export class UniversitiesComponent {}
