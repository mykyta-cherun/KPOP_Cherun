import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://randomuser.me/api/?results=10';
  private favorites: any[] = [];
  private favoritesSubject = new BehaviorSubject<any[]>([]);

  favorites$ = this.favoritesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addToFavorites(user: any): void {
    if (!this.favorites.find(fav => fav.email === user.email)) {
      this.favorites.push(user);
      this.favoritesSubject.next(this.favorites);
    }
  }

  removeFromFavorites(user: any): void {
    this.favorites = this.favorites.filter(fav => fav.email !== user.email);
    this.favoritesSubject.next(this.favorites);
  }
}
