import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatasetService } from '../../core/dataset.service';

@Component({
  selector: 'app-mobile-flow',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <section class="flow-page"><div class="container flow-layout">
      <div class="flow-copy">
        <div class="eyebrow">MOVE-IN, MADE SIMPLE</div><h1>Settle in<br><em>before you arrive.</em></h1>
        <p>Choose dinnerware, cookware, or both. Then plan your delivery and note a payment preference. Three small steps to a smoother first day.</p>
        <div class="flow-feature"><span>01</span><div><strong>Pick your kit</strong><small>Select one or both essentials.</small></div></div>
        <div class="flow-feature"><span>02</span><div><strong>Tell us where</strong><small>Plan room drop-off before arrival.</small></div></div>
        <div class="flow-feature"><span>03</span><div><strong>Choose a preference</strong><small>Tell us how you would prefer to pay when pricing is confirmed.</small></div></div>
        <div class="flow-disclaimer">Concept preview. No order or payment is taken, and pricing is confirmed separately.</div>
      </div>
      <div class="phone-wrap"><div class="phone-frame"><div class="phone-camera"></div><div class="phone-screen">
        <div class="phone-status"><span>9:41</span><span>◖◖ ▰</span></div>
        <div class="phone-app-head"><strong>DISH DASH DOSH<span>.</span></strong><span>⌂</span></div>
        <div class="phone-progress"><span [class.current]="step() === 1" [class.done]="step() > 1"></span><span [class.current]="step() === 2" [class.done]="step() > 2"></span><span [class.current]="step() === 3"></span></div>
        <form [formGroup]="form" (ngSubmit)="next()">
          @if (step() === 1) {
            <div class="phone-content"><span class="phone-step">STEP 01 / 03</span><h2>Make it yours.</h2><p>Select the kits you want for your new space.</p>
              <div class="phone-kit-list">@for (kit of data.kits; track kit.id) {
                <label class="phone-kit" [class.chosen]="selectedKitIds().includes(kit.id)">
                  <input type="checkbox" [checked]="selectedKitIds().includes(kit.id)" (change)="toggleKit(kit.id)">
                  <span class="phone-kit-emoji">{{ kit.image }}</span><span><strong>{{ kit.name }}</strong><small>{{ kit.label }}</small></span>
                </label>
              }</div>
              @if (submitted() && selectedKitIds().length === 0) { <small class="form-error">Choose at least one kit.</small> }
            </div>
          }
          @if (step() === 2) {
            <div class="phone-content"><span class="phone-step">STEP 02 / 03</span><h2>Find your room.</h2><p>We can plan delivery before your move-in day.</p>
              <label class="field-label">University<input type="text" formControlName="university" placeholder="e.g. University of Bristol"></label>
              <label class="field-label">Accommodation / hall<input type="text" formControlName="hall" placeholder="e.g. Maple House"></label>
              <label class="field-label">Room number<input type="text" formControlName="room" placeholder="e.g. B204"></label>
              <label class="check-option"><input type="checkbox" formControlName="dropoff"><span>Room drop-off before arrival</span></label>
              @if (submitted() && (form.controls.university.invalid || form.controls.hall.invalid || form.controls.room.invalid)) { <small class="form-error">Please enter your university and accommodation details.</small> }
            </div>
          }
          @if (step() === 3) {
            <div class="phone-content"><span class="phone-step">STEP 03 / 03</span><h2>Almost home.</h2><p>Review your choices. Pricing is confirmed before ordering.</p>
              <div class="order-summary"><span>Your kits <strong>{{ selectedKitNames() }}</strong></span><span>Delivery <strong>{{ form.controls.dropoff.value ? 'Room drop-off' : 'Collection' }}</strong></span><span>Price <strong>To be confirmed</strong></span></div>
              <label class="payment-choice" [class.chosen]="form.controls.payment.value === 'accommodation'"><input type="radio" formControlName="payment" value="accommodation"><span><strong>Accommodation fee add-on</strong><small>Preferred option, subject to university agreement</small></span></label>
              <label class="payment-choice" [class.chosen]="form.controls.payment.value === 'separate'"><input type="radio" formControlName="payment" value="separate"><span><strong>Pay separately</strong><small>Preferred option for independent payment</small></span></label>
            </div>
          }
          @if (step() === 4) {
            <div class="phone-content phone-success"><div class="success-icon">✓</div><span class="phone-step">PREVIEW COMPLETE</span><h2>Your plan is ready.</h2><p>This is a demo plan. No order has been placed.</p>
              <div class="order-summary"><span>Selected kits <strong>{{ selectedKitNames() }}</strong></span><span>Delivery <strong>{{ form.controls.dropoff.value ? 'Room drop-off' : 'Collection' }}</strong></span><span>Payment preference <strong>{{ form.controls.payment.value === 'accommodation' ? 'Accommodation add-on' : 'Separate' }}</strong></span></div>
              <button class="reset-link" type="button" (click)="reset()">Start again ↗</button>
            </div>
          }
          @if (step() < 4) { <div class="phone-actions">@if (step() > 1) { <button type="button" class="back-button" (click)="back()">← Back</button> }<button class="phone-next" type="submit">{{ step() === 3 ? 'Finish preview' : 'Continue' }} <span>↗</span></button></div> }
        </form>
      </div></div></div>
    </div></section>
  `
})
export class MobileFlowComponent {
  data = inject(DatasetService);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  step = signal(1);
  submitted = signal(false);
  selectedKitIds = signal<string[]>(['dinnerware']);
  selectedKitNames = computed(() => this.data.kits.filter(kit => this.selectedKitIds().includes(kit.id)).map(kit => kit.name).join(' + '));
  form = this.fb.nonNullable.group({ university: ['', Validators.required], hall: ['', Validators.required], room: ['', Validators.required], dropoff: [true], payment: ['accommodation', Validators.required] });
  constructor() {
    const kit = this.route.snapshot.queryParamMap.get('kit');
    if (this.data.kits.some(item => item.id === kit)) this.selectedKitIds.set([kit!]);
  }
  toggleKit(id: string): void {
    this.selectedKitIds.update(ids => ids.includes(id) ? ids.filter(value => value !== id) : [...ids, id]);
  }
  back(): void { this.submitted.set(false); this.step.update(value => Math.max(1, value - 1)); }
  next(): void {
    this.submitted.set(true);
    if (this.step() === 1 && this.selectedKitIds().length === 0) return;
    if (this.step() === 2 && (this.form.controls.university.invalid || this.form.controls.hall.invalid || this.form.controls.room.invalid)) return;
    this.submitted.set(false);
    this.step.update(value => Math.min(4, value + 1));
  }
  reset(): void {
    this.form.reset({ university: '', hall: '', room: '', dropoff: true, payment: 'accommodation' });
    this.selectedKitIds.set(['dinnerware']);
    this.submitted.set(false);
    this.step.set(1);
  }
}
