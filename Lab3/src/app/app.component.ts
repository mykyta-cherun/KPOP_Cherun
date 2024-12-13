import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <label>Введіть URL картинки:</label>
    <input [(ngModel)]="imageUrl" placeholder="Введіть URL картинки">
    <div *ngIf="imageUrl">
      <img [src]="imageUrl" alt="image" width="300" height="auto">
    </div>
  `
})
export class AppComponent {
  imageUrl: string = '';
}
