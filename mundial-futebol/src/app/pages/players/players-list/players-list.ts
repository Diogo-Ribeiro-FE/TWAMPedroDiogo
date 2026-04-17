import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Player } from '../../../core/models/players';
import { PlayersServices } from '../../../core/services/players';

@Component({
  selector: 'app-players-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './players-list.html',
  styleUrl: './players-list.css'
})
export class PlayersListComponent implements OnInit {
  players: Player[] = [];

  constructor(private playerService: PlayersServices, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.playerService.getPlayers().subscribe(data => {
      this.players = [...data];
      this.cdr.detectChanges();
    });
  }

  deletePlayer(id: string) {
    this.playerService.deletePlayer(id).subscribe(() => {
      this.players = this.players.filter(p => String(p.id) !== String(id));
      this.cdr.detectChanges();
    });
  }
  sortPlayers(criterio: 'goals' | 'caps', ordem: 'asc' | 'desc') {
  this.players.sort((a, b) => {
    const valA = a[criterio] || 0;
    const valB = b[criterio] || 0;
    
    if (ordem === 'asc') {
      return valA - valB;
    } else {
      return valB - valA;
    }
  });
}
}