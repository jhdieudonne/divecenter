import { Routes } from '@angular/router';
import { CallbackComponent } from './directives/callback/callback.component';
import { HomeComponent } from './components/home/home.component';
import { BlenderLogComponent } from './components/blenderLog/blenderLog.component';
import { IsAuthenticatedGuard } from './guard/auth.guard';


export const ROUTES: Routes = [
  { path: '', component: HomeComponent, canActivate: [IsAuthenticatedGuard] },
  { path: 'blenderLog', component: BlenderLogComponent, canActivate: [IsAuthenticatedGuard] },
  { path: 'callback', component: CallbackComponent },
  { path: '**', redirectTo: '' }
];
