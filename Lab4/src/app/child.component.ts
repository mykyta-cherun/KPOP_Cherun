import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent {
  @Input() numbers: number[] = [];

  
  getDifference(): number {
    if (this.numbers.length === 0) return 0;
    const max = Math.max(...this.numbers);
    const min = Math.min(...this.numbers);
    return max - min;
  }
}
