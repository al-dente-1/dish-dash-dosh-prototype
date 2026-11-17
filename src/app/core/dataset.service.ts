import { Injectable } from '@angular/core';

export interface Kit { id: string; name: string; label: string; tone: string; image: string; contents: string[]; summary: string; }
export interface Listing { id: number; name: string; price: number; condition: 'Good condition' | 'Refurbished'; category: string; icon: string; color: string; description: string; }
export interface Audit { title: string; detail: string; status: string; date: string; icon: string; }

@Injectable({ providedIn: 'root' })
export class DatasetService {
  readonly metrics = [
    { value: '540', label: 'Items diverted', change: '+12% this term', icon: '↗' },
    { value: '1.8t', label: 'Landfill diverted', change: 'Estimated impact', icon: '◎' },
    { value: '13', label: 'University partners', change: 'Across the UK', icon: '⌂' }
  ];
  readonly phases = [
    { id: 'collect', number: '01', title: 'Move-out collection', date: 'Jun 03 – Jun 28', status: 'Complete', description: 'Campus collection points receive and log reusable student essentials before term ends.', progress: 100 },
    { id: 'sort', number: '02', title: 'Sort, clean & check', date: 'Jul 01 – Aug 09', status: 'In progress', description: 'Our warehouse team checks condition, cleans each item, and records required safety checks.', progress: 68 },
    { id: 'deliver', number: '03', title: 'Campus delivery', date: 'Aug 26 – Sep 14', status: 'Upcoming', description: 'Packed kits are scheduled for room drop-off before students arrive.', progress: 0 }
  ];
  readonly audits: Audit[] = [
    { title: 'Electrical safety', detail: 'PAT test record and applicable CE marking checked for electrical items.', status: 'Verified', date: '12 Aug 2026', icon: 'ϟ' },
    { title: 'Allergy-aware cleaning', detail: 'Cleaning agent and material notes logged for every applicable batch.', status: 'Verified', date: '11 Aug 2026', icon: '✳' },
    { title: 'Textile fire safety', detail: 'Fire-safety labels and care tags checked on bedding and soft furnishings.', status: 'Verified', date: '10 Aug 2026', icon: '◇' }
  ];
  readonly kits: Kit[] = [
    { id: 'dinnerware', name: 'Dinnerware Kit', label: 'For the table', tone: 'stone', image: '🍽️', summary: 'The everyday pieces for meals in your new space.', contents: ['Plates and bowls', 'Mugs and cutlery'] },
    { id: 'cookware', name: 'Cookware Kit', label: 'For the kitchen', tone: 'sage', image: '🍳', summary: 'The essentials for preparing your own meals.', contents: ['Pans and cooking tools', 'Food preparation essentials'] }
  ];
  readonly listings: Listing[] = [
    { id: 1, name: 'Adjustable desk lamp', price: 12, condition: 'Refurbished', category: 'Room', icon: '💡', color: 'mint', description: 'Warm light, tested and ready for late-night study.' },
    { id: 2, name: 'Folding drying rack', price: 8, condition: 'Good condition', category: 'Room', icon: '🧺', color: 'sand', description: 'Compact rack that folds flat between laundry days.' },
    { id: 3, name: 'Cast-iron griddle pan', price: 10, condition: 'Refurbished', category: 'Kitchen', icon: '🍳', color: 'peach', description: 'A sturdy pan with plenty of meals left in it.' },
    { id: 4, name: 'The legendary Danny DeVito cup', price: 6, condition: 'Good condition', category: 'Quirky finds', icon: '☕', color: 'lilac', description: 'One very specific campus legend, ready for a new shelf.' },
    { id: 5, name: 'Bamboo desk organiser', price: 7, condition: 'Good condition', category: 'Room', icon: '✏️', color: 'peach', description: 'Keep notes, pens, and small things in one place.' },
    { id: 6, name: 'Glass food storage set', price: 9, condition: 'Refurbished', category: 'Kitchen', icon: '🥡', color: 'mint', description: 'Three stackable containers for leftovers and lunches.' }
  ];
}
