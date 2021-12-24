import { Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = []
  constructor(
    private http: HttpClient
  ) { }
  getAll():Observable<Product[]> {
    return this.http.get<Product[]>(API_URL + 'products');
  }
  find( id:any ):Observable<Product> {
    return this.http.get<Product>(`${API_URL}/products/${id}`);
  }
  store( product:Product ): Observable<Product>{
    return this.http.post<Product>(API_URL + '/products', product);
  }
  update( id:number, product:Product ): Observable<Product>{
    return this.http.put<Product>(`${API_URL}/products/${id}`, product);
  }
  destroy(id: number): Observable<Product> {
    return this.http.delete<Product>(`${API_URL}/products/${id}`);
  }
}
