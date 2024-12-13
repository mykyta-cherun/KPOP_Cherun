import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  todos: any[] = [];
  favorites: any[] = []; 
  isModalOpen = false;
  selectedTodo: any = null;

  constructor(
    private apiService: ApiService,
    private storage: Storage,
    private toastController: ToastController 
  ) {}

  async ngOnInit() {
    await this.storage.create(); 
    this.favorites = (await this.storage.get('favorites')) || []; 
    this.apiService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }

  
  isFavorite(todo: any): boolean {
    return this.favorites.some((item) => item.id === todo.id);
  }

  
  onTodoClick(todo: any) {
    this.selectedTodo = todo;
    this.isModalOpen = true;
  }

  
  closeModal() {
    this.isModalOpen = false;
    this.selectedTodo = null;
  }

  
  async addToFavorites(todo: any) {
    if (!this.isFavorite(todo)) {
      this.favorites.push(todo);
      await this.storage.set('favorites', this.favorites); 
      this.showToast('Added to favorites!'); 
    } else {
      this.showToast('This item is already in favorites.'); 
    }
  }

  
  async removeFromFavorites(todo: any) {
    this.favorites = this.favorites.filter(item => item.id !== todo.id); 
    await this.storage.set('favorites', this.favorites); 
    this.showToast('Removed from favorites'); 
  }

  
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, 
      position: 'bottom', 
      color: 'dark', 
    });
    toast.present();
  }
}
