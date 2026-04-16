import { Routes } from '@angular/router';
import { TeamsListComponent } from './pages/teams/teams-list/teams-list';
import { TeamForm } from './pages/teams/team-form/team-form';
import { TeamDetail } from './pages/teams/team-detail/team-detail';

//para testarmos algo, por exemplo quis testar o teams-list.html, tens que adicionar aqui ás rotas

export const routes: Routes = [
  { path: 'teams', component: TeamsListComponent },
  { path: 'teams/new', component: TeamForm },
  { path: 'teams/edit/:id', component: TeamForm },
  { path: 'teams/:id', component: TeamDetail },
  { path: '', redirectTo: 'teams', pathMatch: 'full' }
];