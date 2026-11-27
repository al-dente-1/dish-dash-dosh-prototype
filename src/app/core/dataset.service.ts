import { Injectable } from '@angular/core';

export interface Kit { id: string; name: string; label: string; price: number; tone: string; image: string; imageAlt: string; contents: string[]; summary: string; }
export interface Listing { id: number; name: string; image?: string; price: number; condition: 'Good condition' | 'Refurbished'; category: string; icon: string; color: string; description: string; }
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
    { id: 'dinnerware', name: 'Dinnerware Kit', label: 'For the table', tone: 'stone', image: '/images/kitchenware-kit.jpeg', imageAlt: 'Dinnerware kit arranged on a kitchen table beside its delivery box', price: 20, summary: 'The everyday pieces for meals in your new space.', contents: ['Plates and bowls', 'Mugs', 'Cutlery set'] },
    { id: 'cookware', name: 'Cookware Kit', label: 'For the kitchen', tone: 'sage', image: '/images/cookware-kit.jpeg', imageAlt: 'Cookware kit with pots, pans, plates, and utensils arranged on a kitchen table', price: 35, summary: 'Everything in the dinnerware kit, plus what you need to cook.', contents: ['Everything in the Dinnerware Kit', 'Pots and a frying pan', 'Cooking utensils and a chopping board'] }
  ];
  readonly listings: Listing[] = [
    { id: 1, name: 'Adjustable desk lamp', image: '/images/marketplace/desk-lamp.jpeg', price: 12, condition: 'Refurbished', category: 'Room', icon: '💡', color: 'mint', description: 'Warm light, tested and ready for late-night study.' },
    { id: 2, name: 'Folding drying rack', image: '/images/marketplace/clothes-rack.jpeg', price: 8, condition: 'Good condition', category: 'Laundry', icon: '🧺', color: 'sand', description: 'Compact rack that folds flat between laundry days.' },
    { id: 3, name: 'Cast-iron griddle pan', image: '/images/marketplace/cast-iron-griddle.jpeg', price: 10, condition: 'Refurbished', category: 'Kitchen', icon: '🍳', color: 'peach', description: 'A sturdy pan with plenty of meals left in it.' },
    { id: 4, name: 'The legendary Danny DeVito cup', image: '/images/marketplace/funny-face-mug.jpeg', price: 6, condition: 'Good condition', category: 'Quirky finds', icon: '☕', color: 'lilac', description: 'One very specific campus legend, ready for a new shelf.' },
    { id: 5, name: 'Bamboo desk organiser', image: '/images/marketplace/bamboo-desk-pen-holder.jpeg', price: 7, condition: 'Good condition', category: 'Room', icon: '✏️', color: 'peach', description: 'Keep notes, pens, and small things in one place.' },
    { id: 6, name: 'Glass food storage set', image: '/images/marketplace/food-containers.jpeg', price: 9, condition: 'Refurbished', category: 'Kitchen', icon: '🥡', color: 'mint', description: 'Three stackable containers for leftovers and lunches.' },
    { id: 7, name: 'Pirate costume set', image: '/images/marketplace/pirate-costume.jpeg', price: 8, condition: 'Good condition', category: 'Fancy dress', icon: '🏴‍☠️', color: 'lilac', description: 'Hat, sash and eyepatch, worn once for a themed social.' },
    { id: 8, name: 'Inflatable dinosaur costume', image: '/images/marketplace/dino-costume.jpeg', price: 14, condition: 'Good condition', category: 'Fancy dress', icon: '🦖', color: 'mint', description: 'Fan tested and fully inflatable, ready for its next big night out.' },
    { id: 9, name: 'Badminton racket pair', image: '/images/marketplace/badminton-rackets.jpeg', price: 12, condition: 'Good condition', category: 'Sports', icon: '🏸', color: 'sand', description: 'Two rackets and a tube of shuttlecocks for the sports hall.' },
    { id: 10, name: 'Yoga mat', image: '/images/marketplace/green-yoga-mat.jpeg', price: 6, condition: 'Refurbished', category: 'Sports', icon: '🧘', color: 'peach', description: 'Deep cleaned and rolled up, ready for room workouts.' },
    { id: 11, name: 'Bluetooth speaker', image: '/images/marketplace/speaker.jpeg', price: 15, condition: 'Refurbished', category: 'Tech', icon: '🔊', color: 'mint', description: 'Tested, charged and loud enough for a kitchen playlist.' },
    { id: 12, name: 'Over-ear headphones', image: '/images/marketplace/headphones.jpeg', price: 13, condition: 'Refurbished', category: 'Tech', icon: '🎧', color: 'lilac', description: 'For library focus, with fresh ear cushions fitted.' },
    { id: 13, name: 'Laundry basket', price: 4, condition: 'Good condition', category: 'Laundry', icon: '🧼', color: 'peach', description: 'A sturdy basket with handles for the trip to the laundry room.' },
    { id: 14, name: 'First-year textbook bundle', image: '/images/marketplace/textbooks.jpeg', price: 10, condition: 'Good condition', category: 'Books', icon: '📚', color: 'sand', description: 'Core reading for intro modules, with only light highlighting.' },
    { id: 15, name: 'Paperback novel stack', image: '/images/marketplace/paperback-novels.jpeg', price: 5, condition: 'Good condition', category: 'Books', icon: '📖', color: 'mint', description: 'Five paperbacks for reading beyond the module list.' }
  ];
}
