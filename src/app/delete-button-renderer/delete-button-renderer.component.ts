import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Champion } from '../champion';

@Component({
  selector: 'delete-button-renderer',
  template: `<button (click)="onDelete()">Supprimer</button>`,
})
export class DeleteButtonRendererComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  onDelete(): void {
    if (this.params && this.params.context && this.params.context.componentParent) {
      this.params.context.componentParent.deleteChampion(this.params.data);
    } else {
      console.error('Params or context is undefined', this.params);
    }
  }
}
