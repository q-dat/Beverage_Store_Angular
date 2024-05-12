import { Component } from '@angular/core';
import { DataDisplayComponent } from '../../data-display/data-display.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DataDisplayComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
