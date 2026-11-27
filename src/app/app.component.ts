import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from './core/cart.service';

@Component({
  selector: 'app-root', standalone: true, imports: [RouterLink, RouterLinkActive, RouterOutlet],
  styles: [`
    .cart-wrap { position: relative; }
    .cart-button { position: relative; display: grid; place-items: center; width: 42px; height: 42px; border: 1px solid #ffffff40; border-radius: 3px; background: transparent; color: #fff; }
    .cart-button:hover { background: #ffffff14; }
    .cart-button svg { width: 20px; height: 20px; }
    .cart-count { position: absolute; top: -7px; right: -7px; min-width: 18px; height: 18px; padding: 0 5px; border-radius: 99px; background: var(--gold); color: #fff; font-size: 10px; font-weight: 800; line-height: 18px; text-align: center; }
    .cart-panel { position: absolute; right: 0; top: calc(100% + 10px); width: 300px; background: #fcfbf6; color: var(--green); border: 1px solid #e1e3da; border-radius: 4px; box-shadow: 0 18px 40px #0003; padding: 18px; z-index: 50; }
    .cart-panel h2 { font-size: 11px; letter-spacing: .15em; font-family: 'DM Sans', sans-serif; font-weight: 800; color: #90611e; margin: 0 0 14px; }
    .cart-item { display: flex; gap: 12px; align-items: center; }
    .cart-item img { width: 64px; height: 44px; object-fit: cover; border-radius: 3px; flex: none; }
    .cart-item div { flex: 1; min-width: 0; }
    .cart-item strong, .cart-item small { display: block; }
    .cart-item strong { font-size: 13px; }
    .cart-item small { font-size: 11px; color: #7b8a7d; margin-top: 3px; }
    .cart-item b { font-size: 15px; }
    .cart-remove { border: 0; background: none; color: #a56b27; font-size: 11px; font-weight: 800; padding: 4px 0 0; }
    .cart-list { display: grid; gap: 14px; max-height: 320px; overflow-y: auto; }
    .cart-item { align-items: flex-start; }
    .cart-thumb { width: 64px; height: 44px; border-radius: 3px; flex: none; display: grid; place-items: center; font-size: 22px; }
    .cart-thumb.mint { background: #dae6db; } .cart-thumb.sand { background: #e9e2d1; } .cart-thumb.peach { background: #eddcca; } .cart-thumb.lilac { background: #e6dfe8; }
    .cart-total { display: flex; justify-content: space-between; border-top: 1px solid #e1e3da; margin-top: 12px; padding-top: 12px; font-size: 13px; }
    .cart-checkout { display: flex; justify-content: space-between; margin-top: 14px; padding: 13px 14px; background: var(--green); color: #fff; font-size: 12px; font-weight: 800; border-radius: 3px; }
    .cart-empty { font-size: 13px; color: #65706b; margin: 0 0 12px; }
    .cart-browse { font-size: 12px; font-weight: 800; border-bottom: 1px solid currentColor; padding-bottom: 3px; }
    @media (min-width: 1051px) { .cart-wrap { margin-right: -30px; } }
    @media (max-width: 1050px) {
      .cart-wrap { margin-left: auto; }
      .nav-inner .menu-toggle { margin-left: 14px; }
    }
  `],
  template: `
    <div class="app-shell">
      <header class="site-header">
        <div class="container nav-inner">
          <a routerLink="/" class="brand" aria-label="Dish Dash Dosh home">DISH <span class="brand-apostrophe">DASH</span> DOSH<span class="brand-dot">.</span></a>
          <nav class="desktop-nav" aria-label="Main navigation">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">About us</a><a routerLink="/kits" routerLinkActive="active">Starter kits</a><a routerLink="/marketplace" routerLinkActive="active">Marketplace</a><a routerLink="/universities" routerLinkActive="active">For universities</a><a routerLink="/iterations" routerLinkActive="active">Our process</a>
          </nav>
          <div class="cart-wrap">
            <button class="cart-button" type="button" (click)="cartOpen.set(!cartOpen())" [attr.aria-expanded]="cartOpen()" [attr.aria-label]="'Cart, ' + cart.count() + ' item' + (cart.count() === 1 ? '' : 's')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 4h2l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 8H6.2"/><circle cx="9.5" cy="20" r="1.2"/><circle cx="17.5" cy="20" r="1.2"/></svg>
              @if (cart.count()) { <span class="cart-count">{{ cart.count() }}</span> }
            </button>
            @if (cartOpen()) {
              <div class="cart-panel" role="dialog" aria-label="Your cart">
                <h2>YOUR CART</h2>
                @if (!cart.isEmpty()) {
                  <div class="cart-list">
                    @if (cart.kit(); as kit) {
                      <div class="cart-item"><img [src]="kit.image" [alt]="kit.imageAlt"><div><strong>{{ kit.name }}</strong><small>Starter kit</small><button class="cart-remove" type="button" (click)="cart.removeKit()">Remove</button></div><b>£{{ kit.price }}</b></div>
                    }
                    @for (item of cart.listings(); track item.id) {
                      <div class="cart-item">
                        @if (item.image) { <img [src]="item.image" [alt]="item.name"> } @else { <span class="cart-thumb" [class]="'cart-thumb ' + item.color" aria-hidden="true">{{ item.icon }}</span> }
                        <div><strong>{{ item.name }}</strong><small>Marketplace find</small><button class="cart-remove" type="button" (click)="cart.removeListing(item.id)">Remove</button></div><b>£{{ item.price }}</b>
                      </div>
                    }
                  </div>
                  <div class="cart-total"><span>Total</span><strong>£{{ cart.total() }}</strong></div>
                  <a class="cart-checkout" routerLink="/checkout" (click)="cartOpen.set(false)">Checkout <span aria-hidden="true">↗</span></a>
                } @else {
                  <p class="cart-empty">Your cart is empty.</p>
                  <a class="cart-browse" routerLink="/kits" (click)="cartOpen.set(false)">Browse starter kits ↗</a>
                }
              </div>
            }
          </div>
          <a class="nav-cta" routerLink="/mobile-flow">Pre-order to halls <span aria-hidden="true">↗</span></a>
          <button class="menu-toggle" type="button" (click)="menuOpen.set(!menuOpen())" [attr.aria-expanded]="menuOpen()" aria-label="Toggle menu">{{ menuOpen() ? 'Close' : 'Menu' }} <span aria-hidden="true">☰</span></button>
        </div>
        @if (menuOpen()) { <nav class="mobile-nav" aria-label="Mobile navigation" (click)="menuOpen.set(false)"><a routerLink="/">About us</a><a routerLink="/kits">Starter kits</a><a routerLink="/marketplace">Marketplace</a><a routerLink="/universities">For universities</a><a routerLink="/iterations">Our process</a><a routerLink="/mobile-flow">Pre-order to halls ↗</a></nav> }
      </header>
      <main (click)="cartOpen.set(false)"><router-outlet /></main>
      <footer class="site-footer"><div class="container footer-inner"><div><a class="brand footer-brand" routerLink="/">DISH <span class="brand-apostrophe">DASH</span> DOSH<span class="brand-dot">.</span></a><p>Good things deserve another beginning.</p></div><div class="footer-links"><a routerLink="/">About us</a><a routerLink="/kits">Starter kits</a><a routerLink="/marketplace">Marketplace</a><a routerLink="/universities">University partnerships</a><a routerLink="/iterations">Our process</a></div><div class="footer-end"><span>Pass it on.</span><small>Concept demo · Illustrative data</small></div></div></footer>
    </div>`
})
export class AppComponent {
  cart = inject(CartService);
  menuOpen = signal(false);
  cartOpen = signal(false);
}
