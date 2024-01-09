import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http:HttpClient) { }

  /**
   * get all products
   */
  getProducts(){
    const endpoint=`${base_url}/products`
    return this.http.get(endpoint)
  }

  /**
   * save the product
   * @param body
   * @returns
   */
  saveProduct(body:any){
    const endpoint=`${base_url}/products`
    return this.http.post(endpoint,body)
  }

  updateProduct(body:any,id:any){
    const endpoint=`${base_url}/products/${id}`
    return this.http.put(endpoint,body)
  }

  deleteProduct(id:any){
    const endpoint=`${base_url}/products/${id}`
    return this.http.delete(endpoint)
  }

  /*
  * search product by name
  */
  getProducByName(name:any) {
    const endpoint=`${base_url}/products/name/${name}`
    return this.http.get(endpoint)
  }

}
