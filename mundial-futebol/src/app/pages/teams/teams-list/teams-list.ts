import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Team } from '../../../core/models/teams';
import { TeamService } from '../../../core/services/teams';

@Component({
  selector: 'app-teams-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './teams-list.html',
  styleUrl: './teams-list.css'
})
export class TeamsListComponent implements OnInit {
  teams: Team[] = []; // Array que armazena a lista de equipas

  constructor(private teamService: TeamService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {      
  this.teamService.getTeams().subscribe(data => {
    this.teams = [...data];                   // Este metodo é executado quando o componente inicia
    this.cdr.detectChanges();
  });
}

  deleteTeam(id: string) {
    this.teamService.deleteTeam(id).subscribe(() => {
      this.teams = this.teams.filter(t => String(t.id) !== String(id));   // Metodo de deletar equipa
      this.cdr.detectChanges();
    });
  }
}