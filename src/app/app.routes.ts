// src/app/app.routes.ts
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  //Використання loadChildren дозволяє завантажувати модуль аутентифікації при переході на /auth,
  // що підвищує продуктивність вашого додатка.
  { path: 'auth', loadChildren: () => import('./features/auth/auth-routing.module').then(m => m.AuthRoutingModule) },
  // Додайте інші маршрути за потреби
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
