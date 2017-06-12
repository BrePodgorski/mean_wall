import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MessageComponent} from './message/message.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'messages', component: MessageComponent},
];
export const routing = RouterModule.forRoot(APP_ROUTES);


//importing routes, and where things will be directed based on what's typed in
