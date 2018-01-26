import { Routes } from '@angular/router';
import { CallbackComponent } from './directives/callback/callback.component';
import { HomeComponent } from './components/home/home.component';
import { BlenderLogComponent } from './components/blenderLog/blenderLog.component';


export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'blenderLog', component: BlenderLogComponent },
  { path: 'callback', component: CallbackComponent },
  { path: '**', redirectTo: '' }
];
