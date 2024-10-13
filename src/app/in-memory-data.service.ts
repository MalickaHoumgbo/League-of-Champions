import { Injectable } from '@angular/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { Champion } from './champion';
import championData from '../assets/champion_info.json';
import championData2 from '../assets/champion_info_2.json';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService {
  private champions: Champion[] = []; // Stockage des champions

  // Méthode pour créer la base de données initiale
  createDb() {
    this.loadChampions(); 
    return { champions: this.champions }; 
  }

  // Méthode pour charger les champions à partir des fichiers JSON
  private loadChampions(): void {
    // On ajoute les champions à partir de champion_info.json
    Object.keys((championData as any).data).forEach((key) => {
      const champion = (championData as any).data[key];
      this.champions.push({
        id: champion.id,
        name: champion.name,
        title: champion.title,
        tags: champion.tags || [], // Remplir les tags si disponibles
      });
    });

    // on ajoute les champions à partir de champion_info_2.json
    Object.keys((championData2 as any).data).forEach((key) => {
      const champion = (championData2 as any).data[key];
      this.champions.push({
        id: champion.id,
        name: champion.name,
        title: champion.title,
        tags: champion.tags || [], 
      });
    });
  }

  // Méthode pour ajouter un champion
  addChampion(champion: Champion): Champion {
    champion.id = this.champions.length + 1; 
    this.champions.push(champion);
    return champion; 
  }
}
