import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PlayersServices } from '../../../core/services/players';
import { Player } from '../../../core/models/players';

@Component({
  selector: 'app-player-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './player-detail.html',
  styleUrl: './player-detail.css'
})
export class PlayerDetail implements OnInit {
  player: Player | null = null;
  id: string | null = null;

  constructor(
    private playerService: PlayersServices,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.playerService.getPlayerById(this.id).subscribe(data => {
        this.player = { ...data };
        this.cdr.detectChanges();
      });
    }
  }

  deletePlayer() {
    if (this.id) {
      this.playerService.deletePlayer(this.id).subscribe(() => {
        this.router.navigate(['/players']);
      });
    }
  }
}