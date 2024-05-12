import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [CommonModule, HttpClientModule,],
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.css'
})
export class DataDisplayComponent implements OnInit {
  product = inject(HttpClient)
  data: any[] = []
  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.product
    .get('http://localhost:3000/listproducts')
      .subscribe((data: any) => {
        this.data = data;
        console.log(data);
      })
  }
}