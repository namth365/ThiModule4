import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  id: any = 0;
  product!: Product;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductService: ProductService,
    private _Router: Router

  ) { }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.id = id;
      this._ProductService.find(id).subscribe(product => {
        this.product = product;
      });

    });
  }
  handleNo() {
    this._Router.navigate(['/products']);
  }
}
