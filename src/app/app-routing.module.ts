import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';


const routes: Routes = [
  { 
    // Here we establish the use of auth module and its components by using Lazy Load
    path: 'auth', 
    // Import the module we want to charge as a Promise and use .then to load that module
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ) 
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule )
  },
  { path: '404', component: ErrorPageComponent },
  { path: '**', redirectTo: '404' }
];

// To generate this file via angular CLI use: ng g m appRouting --flat
// --flat: avoid folder creation
@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
