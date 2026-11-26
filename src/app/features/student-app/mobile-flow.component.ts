import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatasetService } from '../../core/dataset.service';

interface PlacedPreorder { kitName: string; price: number; delivery: string; address: string; }

/** Pre-order one starter kit for delivery to university halls before move-in. Separate from the cart, which ships to a home address. */
@Component({
  selector: 'app-mobile-flow',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="flow-page"><div class="container flow-layout">
      <div class="flow-copy">
        <div class="eyebrow">PRE-ORDER TO YOUR HALLS</div><h1>Settle in<br><em>before you arrive.</em></h1>
        <p>Pre-order your starter kit and we'll have it waiting in your university room on move-in day. Three small steps to a smoother first day.</p>
        <div class="flow-feature"><span>01</span><div><strong>Pick your kit</strong><small>Dinnerware or cookware, whichever suits you.</small></div></div>
        <div class="flow-feature"><span>02</span><div><strong>Tell us your room</strong><small>Your halls and room number for drop-off.</small></div></div>
        <div class="flow-feature"><span>03</span><div><strong>Check out</strong><small>Review your pre-order and pay.</small></div></div>
        <p class="order-switch">Want it sent to your home instead? <a routerLink="/kits">Add a kit to your cart</a></p>
        <div class="flow-disclaimer">Concept preview. Payment is simulated: nothing is charged and no order is placed.</div>
      </div>
      <div class="order-card">
        <div class="phone-progress"><span [class.current]="step() === 1" [class.done]="step() > 1"></span><span [class.current]="step() === 2" [class.done]="step() > 2"></span><span [class.current]="step() === 3" [class.done]="step() > 3"></span></div>
        <form [formGroup]="form" (ngSubmit)="next()">
          @if (step() === 1) {
            <div class="phone-content"><span class="phone-step">STEP 01 / 03</span><h2>Make it yours.</h2><p>Pick one kit. The cookware kit includes everything in the dinnerware kit.</p>
              <div class="phone-kit-list" role="radiogroup" aria-label="Choose a kit">@for (kit of data.kits; track kit.id) {
                <label class="phone-kit" [class.chosen]="kitId() === kit.id">
                  <input type="radio" name="kit" [checked]="kitId() === kit.id" (change)="kitId.set(kit.id)">
                  <img class="order-kit-thumb" [src]="kit.image" [alt]="kit.imageAlt">
                  <span class="order-kit-info"><strong>{{ kit.name }}</strong><small>{{ kit.summary }}</small>
                    <ul class="order-kit-items">@for (item of kit.contents; track item) { <li>{{ item }}</li> }</ul>
                  </span>
                  <b class="order-kit-price">£{{ kit.price }}</b>
                </label>
              }</div>
              @if (submitted() && !kit()) { <small class="form-error">Choose a kit to continue.</small> }
            </div>
          }
          @if (step() === 2) {
            <div class="phone-content"><span class="phone-step">STEP 02 / 03</span><h2>Find your room.</h2><p>We'll drop your kit off before your move-in day.</p>
              <label class="field-label">University<input type="text" formControlName="university"></label>
              <label class="field-label">Accommodation / hall<input type="text" formControlName="hall" list="bath-halls" placeholder="e.g. Woodland Court"></label>
              <datalist id="bath-halls">@for (hall of bathHalls; track hall) { <option [value]="hall"></option> }</datalist>
              <label class="field-label">Room number<input type="text" formControlName="room" placeholder="e.g. 4B"></label>
              <label class="check-option"><input type="checkbox" formControlName="dropoff"><span>Leave it in my room before I arrive</span></label>
              @if (submitted() && (form.controls.university.invalid || form.controls.hall.invalid || form.controls.room.invalid)) { <small class="form-error">Please enter your university and accommodation details.</small> }
            </div>
          }
          @if (step() === 3) {
            <div class="phone-content"><span class="phone-step">STEP 03 / 03</span><h2>Check out.</h2><p>Review your pre-order and pay.</p>
              <div class="order-summary"><span>{{ kit()?.name }} <strong>£{{ kit()?.price }}</strong></span><span>Deliver to <strong>{{ addressText() }}</strong></span><span>Delivery <strong>{{ deliveryText() }}</strong></span><span class="order-total">Total <strong>£{{ kit()?.price }}</strong></span></div>
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
              <div class="phone-content phone-success"><div class="success-icon">✓</div><span class="phone-step">PREVIEW COMPLETE</span><h2>See you on move-in day.</h2><p>This is a demo. No payment was taken and no order was placed.</p>
                <div class="order-summary"><span>{{ order.kitName }} <strong>£{{ order.price }}</strong></span><span>Deliver to <strong>{{ order.address }}</strong></span><span>Delivery <strong>{{ order.delivery }}</strong></span><span class="order-total">Paid (demo) <strong>£{{ order.price }}</strong></span></div>
                <button class="reset-link" type="button" (click)="reset()">Start again ↗</button>
              </div>
            }
          }
          @if (step() < 4) { <div class="phone-actions">@if (step() > 1) { <button type="button" class="back-button" (click)="back()">← Back</button> }<button class="phone-next" type="submit">{{ step() === 3 ? 'Pay £' + (kit()?.price ?? '') : 'Continue' }} <span>↗</span></button></div> }
        </form>
      </div>
    </div></section>
  `
})
export class MobileFlowComponent {
  data = inject(DatasetService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  step = signal(1);
  submitted = signal(false);
  kitId = signal<string | null>(null);
  kit = computed(() => this.data.kits.find(kit => kit.id === this.kitId()) ?? null);
  placed = signal<PlacedPreorder | null>(null);
  readonly bathHalls = ['Brendon Court', 'Eastwood', 'Marlborough Court', 'Norwood House', 'Polden Court', 'Solsbury Court', 'The Quads', 'Westwood', 'Woodland Court'];
  form = this.fb.nonNullable.group({
    university: ['University of Bath', Validators.required],
    hall: ['', Validators.required],
    room: ['', Validators.required],
    dropoff: [true],
    cardName: ['', Validators.required],
    cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9 ]{12,23}$/)]],
    expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
    cvc: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]]
  });

  constructor() {
    const kit = this.route.snapshot.queryParamMap.get('kit');
    if (this.data.kits.some(item => item.id === kit)) this.kitId.set(kit);
  }

  addressText(): string { const c = this.form.controls; return `${c.room.value}, ${c.hall.value}, ${c.university.value}`; }
  deliveryText(): string { return this.form.controls.dropoff.value ? 'Room drop-off before move-in' : 'Collect from halls reception'; }
  paymentInvalid(): boolean {
    const c = this.form.controls;
    return c.cardName.invalid || c.cardNumber.invalid || c.expiry.invalid || c.cvc.invalid;
  }

  back(): void { this.submitted.set(false); this.step.update(value => Math.max(1, value - 1)); }
  next(): void {
    this.submitted.set(true);
    const c = this.form.controls;
    if (this.step() === 1 && !this.kit()) return;
    if (this.step() === 2 && (c.university.invalid || c.hall.invalid || c.room.invalid)) return;
    if (this.step() === 3) {
      const kit = this.kit();
      if (!kit || this.paymentInvalid()) return;
      this.placed.set({ kitName: kit.name, price: kit.price, delivery: this.deliveryText(), address: this.addressText() });
      // Demo only: wipe card fields straight away.
      this.form.patchValue({ cardName: '', cardNumber: '', expiry: '', cvc: '' });
    }
    this.submitted.set(false);
    this.step.update(value => Math.min(4, value + 1));
  }
  reset(): void {
    this.form.reset();
    this.kitId.set(null);
    this.placed.set(null);
    this.submitted.set(false);
    this.step.set(1);
  }
}
