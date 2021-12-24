import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  id: any = 0;
  productForm!: FormGroup;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductService: ProductService,
    private _Router: Router
  ) { }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.id = id;
      let product = this._ProductService.find(id).subscribe(product => {
      this.productForm = new FormGroup({
        name: new FormControl(product.name, [
          Validators.required
        ]),
        auth: new FormControl(product.auth, [
          Validators.required
        ]),
        content: new FormControl(product.content, [
          Validators.required
        ])
      });
    });
  });
  }

  onSubmit(){
    let formData = this.productForm.value;
    let product: Product = {
      name: formData.name,
      auth: formData.auth,
      content: formData.content
    }
    this._ProductService.update(this.id,product).subscribe(() => {
    this._Router.navigate(['/products']);
  }, e => {
    console.log(e);
  });
}
handleNo() {
  this._Router.navigate(['/products']);
}
  
}
