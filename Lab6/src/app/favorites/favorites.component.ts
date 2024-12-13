import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];

  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    this.favorites = (await this.storage.get('favorites')) || [];
  }
}
