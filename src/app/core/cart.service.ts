import { Injectable, computed, inject, signal } from '@angular/core';
import { DatasetService } from './dataset.service';

const STORAGE_KEY = 'ddd-cart';

interface StoredCart { kitId: string | null; listingIds: number[]; }

/**
 * Holds what a student has chosen: at most one starter kit (the kits overlap, so it's one or the other)
 * plus any number of marketplace finds. Each find is a one-off, so it can only be in the cart once.
 */
@Injectable({ providedIn: 'root' })
export class CartService {
  private data = inject(DatasetService);
  private stored = this.load();
  readonly kitId = signal<string | null>(this.stored.kitId);
  readonly listingIds = signal<number[]>(this.stored.listingIds);

  readonly kit = computed(() => this.data.kits.find(kit => kit.id === this.kitId()) ?? null);
  readonly listings = computed(() => this.data.listings.filter(item => this.listingIds().includes(item.id)));
  readonly count = computed(() => (this.kit() ? 1 : 0) + this.listings().length);
  readonly total = computed(() => (this.kit()?.price ?? 0) + this.listings().reduce((sum, item) => sum + item.price, 0));
  readonly isEmpty = computed(() => this.count() === 0);

  setKit(id: string): void {
    if (!this.data.kits.some(kit => kit.id === id)) return;
    this.kitId.set(id);
    this.save();
  }

  removeKit(): void {
    this.kitId.set(null);
    this.save();
  }

  hasListing(id: number): boolean { return this.listingIds().includes(id); }

  addListing(id: number): void {
    if (this.hasListing(id) || !this.data.listings.some(item => item.id === id)) return;
    this.listingIds.update(ids => [...ids, id]);
    this.save();
  }

  removeListing(id: number): void {
    this.listingIds.update(ids => ids.filter(value => value !== id));
    this.save();
  }

  toggleListing(id: number): void {
    if (this.hasListing(id)) this.removeListing(id); else this.addListing(id);
  }

  clear(): void {
    this.kitId.set(null);
    this.listingIds.set([]);
    this.save();
  }

  private load(): StoredCart {
    const empty: StoredCart = { kitId: null, listingIds: [] };
    try {
      if (typeof localStorage === 'undefined') return empty;
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
      if (!parsed) return empty;
      return {
        kitId: typeof parsed.kitId === 'string' ? parsed.kitId : null,
        listingIds: Array.isArray(parsed.listingIds) ? parsed.listingIds.filter((id: unknown) => typeof id === 'number') : []
      };
    } catch { return empty; }
  }

  private save(): void {
    try {
      if (typeof localStorage === 'undefined') return;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ kitId: this.kitId(), listingIds: this.listingIds() }));
    } catch { /* storage unavailable: cart still works for this visit */ }
  }
}
