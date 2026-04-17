import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PlayersServices } from '../../../core/services/players';
import { Player } from '../../../core/models/players'; 
import { TeamService } from '../../../core/services/teams'; 
import { Team } from '../../../core/models/teams';

@Component({
  selector: 'app-player-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './player-form.html',
  styleUrl: './player-form.css'
})
export class PlayerForm implements OnInit {
  player: Player = {
    name: '',
    position: '',
    number: 0,
    teamId: '',
    isStartingXI: false,
    fotoUrl: '',
    birthDate: '',
    club: '',
    caps: 0,
    goals: 0
  };

  // ESTA LINHA É A QUE ESTÁ A FALTAR E CAUSA O ERRO
  teams: Team[] = []; 

  isEdit = false;
  id: string | null = null;

  constructor(
    private playerService: PlayersServices,
    private teamService: TeamService, // Garante que este serviço está aqui
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Carregar as seleções para preencher o select
    this.teamService.getTeams().subscribe(data => {
      this.teams = data;
      this.cdr.detectChanges();
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.isEdit = true;
      this.playerService.getPlayerById(this.id).subscribe(data => {
        this.player = { ...data };
        this.cdr.detectChanges();
      });
    }
  }

  onSubmit() {
    if (this.isEdit && this.id) {
      this.playerService.updatePlayer(this.id, this.player).subscribe(() => {
        this.router.navigate(['/players']);
      });
    } else {
      this.playerService.createPlayer(this.player).subscribe(() => {
        this.router.navigate(['/players']);
      });
    }
  }
}
