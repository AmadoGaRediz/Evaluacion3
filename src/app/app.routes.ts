import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './auth.guard';
import { RegistrodocsComponent } from './pages/registrodocs/registrodocs.component';
import { RegistroPacienComponent } from './pages/registropacien/registropacien.component';

export const routes: Routes = [
    {
        path: '',
        component : LoginComponent
    },
    {
        path: 'home',
        component : HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: 'registrodocs',
        component : RegistrodocsComponent,
        canActivate: [authGuard]
    },
    {
        path: 'registropacien',
        component : RegistroPacienComponent,
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo : ''
    }

];
