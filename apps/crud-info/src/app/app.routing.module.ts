import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: async () =>
      (await import('./domain/auth/pages/sing-in/sing-in.component'))
        .SignInComponent,
  },
  {
    path: 'auth/sing-up',
    loadComponent: async () =>
      (await import('./domain/auth/pages/sing-up/sing-up.component'))
        .SingUpComponent,
  },
  {
    path: 'home',
    loadComponent: async () =>
      (await import('./domain/home/pages/home/home.component')).HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
