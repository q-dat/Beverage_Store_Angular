import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiurl } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(private http:HttpClient) { }
  getFindAll():Observable<any> {
    return this.http.get<any>(`${apiurl}/products`)
  }

  getFindById(id:string):Observable<any> {
    return this.http.get<any>(`${apiurl}/products/${id}`)
  }

  getProductCatalog(catalog: string):Observable<any>  {
    return this.http.get<any>(`${apiurl}/products/idcatalog/${catalog}`)
  }
}