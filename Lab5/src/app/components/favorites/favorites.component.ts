import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.favorites$.subscribe((favorites) => {
      this.favorites = favorites;
    });
  }

  removeFromFavorites(user: any): void {
    this.userService.removeFromFavorites(user);
  }
}
