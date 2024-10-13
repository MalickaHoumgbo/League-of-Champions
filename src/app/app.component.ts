import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChampionService } from './champion.service';
import { ColDef } from 'ag-grid-community';
import { Champion } from './champion';
import { GridApi } from 'ag-grid-community';
import { DeleteButtonRendererComponent } from './delete-button-renderer/delete-button-renderer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  title = 'League-of-Legends-2';
  champions: Champion[] = [];
  championForm: FormGroup;

  gridApi!: GridApi;
  
  onGridReady(params: any) {
    this.gridApi = params.api; 
  }
  columnDefs: ColDef<Champion>[] = [
    { headerName: 'Nom', field: 'name' },
    { headerName: 'Titre', field: 'title' },
    {
      headerName: 'Tags',
      field: 'tags',
      valueFormatter: (params) => {
        
        return Array.isArray(params.value) ? params.value.join(', ') : '';
      },
    },
    {
      headerName: 'Action',
      cellRenderer:DeleteButtonRendererComponent, 
    },
  ];

  constructor(private championService: ChampionService, private fb: FormBuilder) {
    this.championForm = this.fb.group({
      id: [],
      name: [],
      title: [],
      tags: [],
    });
  }

  ngOnInit() {
    this.getChampions();
  }

  getChampions(): void {
    this.championService.getChampions().subscribe((champions) => {
      this.champions = champions;
    });
  }

  addChampion(): void {
    if (this.championForm.valid) {
      const championToAdd = {
        ...this.championForm.value,
        tags: this.championForm.value.tags.split(',').map((tag: string) => tag.trim()), // Convertir les tags en tableau
      };
      
      console.log('Adding champion:', championToAdd);
      this.championService.addChampion(championToAdd).subscribe((champion) => {
        this.champions.push(champion); // Ajouter un champion à la liste
        this.championForm.reset(); // Réinitialise le formulaire
        
      });
    } else {
      console.error('Form is invalid');
    }
  }

  deleteChampion(champion: Champion): void {
    this.championService.deleteChampion(champion.id).subscribe(() => {
      this.champions = this.champions.filter((c) => c !== champion);

      setTimeout(() => {
        this.gridApi?.refreshCells(); 
      }, 0);
    });
  }
}
