import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/cart.service';

interface OrderLine { name: string; price: number; }
interface PlacedOrder { lines: OrderLine[]; total: number; address: string; }

/** Checkout for the cart (a kit and/or marketplace finds), delivered to a home address. */
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="flow-page"><div class="container flow-layout">
      <div class="flow-copy">
        <div class="eyebrow">CART CHECKOUT / HOME DELIVERY</div><h1>Good finds,<br><em>sent home.</em></h1>
        <p>Check out your cart and we'll deliver it to your home address, ready to pack for uni.</p>
        <div class="flow-feature"><span>01</span><div><strong>Review your cart</strong><small>Your kit and marketplace finds.</small></div></div>
        <div class="flow-feature"><span>02</span><div><strong>Home address</strong><small>Where should we send it?</small></div></div>
        <div class="flow-feature"><span>03</span><div><strong>Pay</strong><small>Review your order and pay.</small></div></div>
        <p class="order-switch">Want your kit waiting in your university room? <a routerLink="/mobile-flow">Pre-order to your halls</a></p>
        <div class="flow-disclaimer">Concept preview. Payment is simulated: nothing is charged and no order is placed.</div>
      </div>
      <div class="order-card">
        @if (step() < 4 && cart.isEmpty()) {
          <div class="phone-content"><span class="phone-step">YOUR CART</span><h2>Your cart is empty.</h2><p>Add a starter kit or some marketplace finds to get started.</p>
            <div class="phone-actions"><a class="phone-next" routerLink="/kits">Browse starter kits <span>↗</span></a></div>
            <p class="order-switch"><a routerLink="/marketplace">Or explore the marketplace</a></p>
          </div>
        } @else {
          <div class="phone-progress"><span [class.current]="step() === 1" [class.done]="step() > 1"></span><span [class.current]="step() === 2" [class.done]="step() > 2"></span><span [class.current]="step() === 3" [class.done]="step() > 3"></span></div>
          <form [formGroup]="form" (ngSubmit)="next()">
            @if (step() === 1) {
              <div class="phone-content"><span class="phone-step">STEP 01 / 03</span><h2>Your cart.</h2><p>Everything here is delivered together to your home address.</p>
                @if (cart.kit(); as kit) {
                  <div class="order-line"><img class="order-kit-thumb" [src]="kit.image" [alt]="kit.imageAlt"><div class="order-kit-info"><strong>{{ kit.name }}</strong><small>Starter kit</small><button type="button" class="order-remove" (click)="cart.removeKit()">Remove</button></div><b>£{{ kit.price }}</b></div>
                }
                @for (item of cart.listings(); track item.id) {
                  <div class="order-line">
                    @if (item.image) { <img class="order-kit-thumb" [src]="item.image" [alt]="item.name"> } @else { <span class="order-thumb-emoji" [class]="'order-thumb-emoji ' + item.color" aria-hidden="true">{{ item.icon }}</span> }
                    <div class="order-kit-info"><strong>{{ item.name }}</strong><small>Marketplace find</small><button type="button" class="order-remove" (click)="cart.removeListing(item.id)">Remove</button></div><b>£{{ item.price }}</b>
                  </div>
                }
                <div class="order-summary"><span class="order-total">Total <strong>£{{ cart.total() }}</strong></span></div>
              </div>
            }
            @if (step() === 2) {
              <div class="phone-content"><span class="phone-step">STEP 02 / 03</span><h2>Where to?</h2><p>We'll deliver to your home address.</p>
                <label class="field-label">Full name<input type="text" formControlName="fullName" autocomplete="name"></label>
                <label class="field-label">Address line 1<input type="text" formControlName="line1" autocomplete="address-line1"></label>
                <label class="field-label">Address line 2 (optional)<input type="text" formControlName="line2" autocomplete="address-line2"></label>
                <div class="field-row">
                  <label class="field-label">Town / city<input type="text" formControlName="city" autocomplete="address-level2"></label>
                  <label class="field-label">Postcode<input type="text" formControlName="postcode" autocomplete="postal-code"></label>
                </div>
                @if (submitted() && addressInvalid()) { <small class="form-error">Please enter your name and a full delivery address.</small> }
              </div>
            }
            @if (step() === 3) {
              <div class="phone-content"><span class="phone-step">STEP 03 / 03</span><h2>Check out.</h2><p>Review your order and pay.</p>
                <div class="order-summary">@for (line of cartLines(); track line.name) { <span>{{ line.name }} <strong>£{{ line.price }}</strong></span> }<span>Deliver to <strong>{{ addressText() }}</strong></span><span class="order-total">Total <strong>£{{ cart.total() }}</strong></span></div>
                <small class="demo-note">Demo checkout: please don't enter real card details. Try 4242 4242 4242 4242. Nothing is charged or saved.</small>
                <label class="field-label">Name on card<input type="text" formControlName="cardName" autocomplete="off" placeholder="e.g. Alex Smith"></label>
                <label class="field-label">Card number<input type="text" formControlName="cardNumber" inputmode="numeric" autocomplete="off" placeholder="4242 4242 4242 4242"></label>
                <div class="field-row">
                  <label class="field-label">Expiry<input type="text" formControlName="expiry" autocomplete="off" placeholder="MM/YY"></label>
                  <label class="field-label">CVC<input type="text" formControlName="cvc" inputmode="numeric" autocomplete="off" placeholder="123"></label>
                </div>
                @if (submitted() && paymentInvalid()) { <small class="form-error">Please check your card details.</small> }
              </div>
            }
            @if (step() === 4) {
              @if (placed(); as order) {
                <div class="phone-content phone-success"><div class="success-icon">✓</div><span class="phone-step">PREVIEW COMPLETE</span><h2>On its way home.</h2><p>This is a demo. No payment was taken and no order was placed.</p>
                  <div class="order-summary">@for (line of order.lines; track line.name) { <span>{{ line.name }} <strong>£{{ line.price }}</strong></span> }<span>Deliver to <strong>{{ order.address }}</strong></span><span class="order-total">Paid (demo) <strong>£{{ order.total }}</strong></span></div>
                  <a class="reset-link" routerLink="/marketplace">Keep browsing ↗</a>
                </div>
              }
            }
            @if (step() < 4) { <div class="phone-actions">@if (step() > 1) { <button type="button" class="back-button" (click)="back()">← Back</button> }<button class="phone-next" type="submit">{{ step() === 3 ? 'Pay £' + cart.total() : 'Continue' }} <span>↗</span></button></div> }
          </form>
        }
      </div>
    </div></section>
  `
})
export class CheckoutComponent {
  cart = inject(CartService);
  private fb = inject(FormBuilder);
  step = signal(1);
  submitted = signal(false);
  placed = signal<PlacedOrder | null>(null);
  form = this.fb.nonNullable.group({
    fullName: ['', Validators.required],
    line1: ['', Validators.required],
    line2: [''],
    city: ['', Validators.required],
    postcode: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/)]],
    cardName: ['', Validators.required],
    cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9 ]{12,23}$/)]],
    expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
    cvc: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
  });

  cartLines(): OrderLine[] {
    const kit = this.cart.kit();
    return [...(kit ? [{ name: kit.name, price: kit.price }] : []), ...this.cart.listings().map(item => ({ name: item.name, price: item.price }))];
  }
  addressText(): string {
    const c = this.form.controls;
    return [c.line1.value, c.line2.value, c.city.value, c.postcode.value.toUpperCase()].filter(Boolean).join(', ');
  }
  addressInvalid(): boolean {
    const c = this.form.controls;
    return c.fullName.invalid || c.line1.invalid || c.city.invalid || c.postcode.invalid;
  }
  paymentInvalid(): boolean {
    const c = this.form.controls;
    return c.cardName.invalid || c.cardNumber.invalid || c.expiry.invalid || c.cvc.invalid;
  }

  back(): void { this.submitted.set(false); this.step.update(value => Math.max(1, value - 1)); }
  next(): void {
    this.submitted.set(true);
    if (this.cart.isEmpty()) return;
    if (this.step() === 2 && this.addressInvalid()) return;
    if (this.step() === 3) {
      if (this.paymentInvalid()) return;
      this.placed.set({ lines: this.cartLines(), total: this.cart.total(), address: this.addressText() });
      // Demo only: wipe card fields straight away and empty the cart.
      this.form.patchValue({ cardName: '', cardNumber: '', expiry: '', cvc: '' });
      this.cart.clear();
    }
    this.submitted.set(false);
    this.step.update(value => Math.min(4, value + 1));
  }
}
