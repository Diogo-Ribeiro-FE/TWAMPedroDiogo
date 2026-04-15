import { Routes } from '@angular/router';
import { TeamsListComponent } from './pages/teams/teams-list/teams-list';

//para testarmos algo, por exemplo quis testar o teams-list.html, tens que adicionar aqui ás rotas

export const routes: Routes = [
  { path: 'teams', component: TeamsListComponent },
  { path: '', redirectTo: 'teams', pathMatch: 'full' }
];