import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  numbers: number[] = [];

  updateArray(input: string): void {
    this.numbers = input.split(',').map(num => parseFloat(num.trim()));
  }

  onInput(event: any): void {
    const inputValue = event.target.value;
    event.target.value = inputValue.replace(/[^0-9\-,.]/g, '');
    this.updateArray(event.target.value);
  }
  
  
}
