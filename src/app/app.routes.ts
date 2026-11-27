import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent), title: "DISH DASH DOSH | Sustainable Student Transitions" },
  { path: 'dashboard', loadComponent: () => import('./features/b2b-dashboard/dashboard.component').then(m => m.DashboardComponent), title: "University Dashboard | DISH DASH DOSH" },
  { path: 'universities', loadComponent: () => import('./features/university-partnership/universities.component').then(m => m.UniversitiesComponent), title: "University Partnerships | DISH DASH DOSH" },
  { path: 'kits', loadComponent: () => import('./features/starter-kits/kits.component').then(m => m.KitsComponent), title: "Starter Kits | DISH DASH DOSH" },
  { path: 'mobile-flow', loadComponent: () => import('./features/student-app/mobile-flow.component').then(m => m.MobileFlowComponent), title: "Pre-order | DISH DASH DOSH" },
  { path: 'marketplace', loadComponent: () => import('./features/marketplace/marketplace.component').then(m => m.MarketplaceComponent), title: "Campus Surplus | DISH DASH DOSH" },
  { path: 'checkout', loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent), title: "Checkout | DISH DASH DOSH" },
  { path: 'iterations', loadComponent: () => import('./features/iterations/iterations.component').then(m => m.IterationsComponent), title: "How We Evolved | DISH DASH DOSH" },
  { path: '**', redirectTo: '' }
];
