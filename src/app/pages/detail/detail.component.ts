import { Component, OnInit, inject } from '@angular/core';
import { Products } from '../../common/product';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Added import

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Added HttpClientModule
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'], // Corrected styleUrl to styleUrls
})
export class DetailComponent implements OnInit {
  product = inject(HttpClient);
  data: Products[] = [];
  pr: Products | undefined;
  
  constructor(private route: ActivatedRoute) {} // Added constructor for dependency injection

  fetchData() {
    this.product
      .get<Products[]>('http://localhost:3000')
      .subscribe((data: Products[]) => {
        this.data = data.splice(0, 8);
        console.log(data);
        const id = +this.route.snapshot.params['id'];
        this.pr = this.data.find(p => p.id === id);
      });
  }

  ngOnInit(): void {
    this.fetchData();
  }
}
