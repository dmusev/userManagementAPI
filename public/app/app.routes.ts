// Imports
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';

// Guards
import { LoginGuard } from './components/login/login.guard.component';
import { AuthGuard } from './utils/authGuard.component';

// Route Configuration
export const routes: Routes = [
    { path: '', component: LoginComponent, canActivate: [LoginGuard]},
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
    // Lazy loading module
    { path: 'home', loadChildren: 'app/modules/home/home.module#HomeModule', canActivate: [AuthGuard], data: {roles:  ['admin', 'regular']}},
    // otherwise redirect to login
    { path: '**', redirectTo: '/' }
];

// Export
export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
