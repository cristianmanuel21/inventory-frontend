import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductElement } from './productElement';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.getProducts()
  }

  displayedColumns:string[]=['id','name','price','account','category','picture','actions']
  dataSource=new MatTableDataSource<ProductElement>()

  @ViewChild(MatPaginator)
  paginator!:MatPaginator


  getProducts(){
    this.productService.getProducts()
        .subscribe((data:any)=>{
          console.log("respuesta de productos: ",data)
          this.processProductResponse(data)

        },(error:any)=>{
          console.log("error en productos ",error)
        })
  }

  processProductResponse(resp:any){
    const dataProduct:ProductElement[]=[]
    if(resp.metadata[0].code=="00"){
      let listCProduct=resp.productResponse.products
      listCProduct.forEach((element:ProductElement)=>{
        element.category=element.category.name
        element.picture='data:image/jpeg;base64,'+element.picture
        dataProduct.push(element)
      })
      //set datasource
       this.dataSource=new MatTableDataSource<ProductElement>(dataProduct)
       this.dataSource.paginator=this.paginator

    }


  }

}
