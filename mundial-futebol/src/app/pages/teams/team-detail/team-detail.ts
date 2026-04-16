import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TeamService } from '../../../core/services/teams';
import { Team } from '../../../core/models/teams';
import { PlayersServices } from '../../../core/services/players';
import { Player } from '../../../core/models/players';

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './team-detail.html',
  styleUrl: './team-detail.css'
})
export class TeamDetail implements OnInit {
  team: Team | null = null;
  players: Player[] = [];
  id: string | null = null;

  constructor(
    private teamService: TeamService,
    private playerService: PlayersServices,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.teamService.getTeamById(this.id).subscribe(data => {
        this.team = { ...data };
        this.cdr.detectChanges();
      });

      this.playerService.getPlayersByTeam(this.id).subscribe(data => {
        this.players = data;
        this.cdr.detectChanges();
      });
    }
  }

  deleteTeam() {
    if (this.id) {
      this.teamService.deleteTeam(this.id).subscribe(() => {
        this.router.navigate(['/teams']);
      });
    }
  }
}