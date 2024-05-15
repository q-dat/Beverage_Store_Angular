import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
pageChangeEvent($event: Event) {
throw new Error('Method not implemented.');
}
  
  product = inject(HttpClient)
  data: any[] = []
  ngOnInit(): void {
    this.fetchData();

  }
  fetchData() {
    this.product
      .get('http://localhost:3000/listproducts')
      .subscribe((data: any) => {
        this.data = data.splice(0, 8);
        // console.log(data);
      })
  }
}
