import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TeamService } from '../../../core/services/teams';
import { Team } from '../../../core/models/teams';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './team-form.html',
  styleUrl: './team-form.css'
})

export class TeamForm implements OnInit {
  team: Team = {
    country: '',
    confederation: '',
    coach: '',
    fifaRanking: 0,
    flagUrl: ''
  };

  isEdit = false;
  id: string | null = null;  // Armazena o ID caso tenha, caso não haja é nulo

 constructor(
  private teamService: TeamService,
  private route: ActivatedRoute,
  private router: Router,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit() {
  this.id = this.route.snapshot.paramMap.get('id');
  if (this.id) {
    this.isEdit = true;
    this.teamService.getTeamById(this.id).subscribe(data => {
      this.team = { ...data };
      this.cdr.detectChanges();
    });
  }
}


  onSubmit() {
    if (this.isEdit && this.id) {
      this.teamService.updateTeam(this.id, this.team).subscribe(() => {     //Modo Edição
        this.router.navigate(['/teams']);
      });                                                                   
    } else {
      this.teamService.createTeam(this.team).subscribe(() => {   //Modo criação de seleção pois o isEdit é falso se não estava no If e não no Else
        this.router.navigate(['/teams']);
      });
    }
  }
}