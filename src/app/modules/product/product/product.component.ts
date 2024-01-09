import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductElement } from './productElement';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../../shared/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { NewProductComponent } from '../new-product/new-product.component';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService:ProductService,
              public dialog: MatDialog,private snackBar:MatSnackBar) { }

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
        //element.category=element.category.name
        element.picture='data:image/jpeg;base64,'+element.picture
        dataProduct.push(element)
      })
      //set datasource
       this.dataSource=new MatTableDataSource<ProductElement>(dataProduct)
       this.dataSource.paginator=this.paginator
    }
  }

  openProductDialog(): void {

    const dialogRef = this.dialog.open(NewProductComponent ,{
      width: '450px'
      //data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result==1){
        this.openSnackBar("Producto Agregado","Exito")
        this.getProducts()
      }else if(result==2){
        this.openSnackBar("Se produjo un error al guardar producto","Error")
        this.getProducts()
      }

    });
}

openSnackBar(message:string,action:string): MatSnackBarRef<SimpleSnackBar>{
  return this.snackBar.open(message,action,{
    duration: 2000
  })
}

  edit(id: number,name: string,price:number,account:number,category: any) {
    const dialogRef = this.dialog.open(NewProductComponent ,{
      width: '450px',
      data: {id:id, name:name, price:price, account:account, category:category},
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result==1){
        this.openSnackBar("Producto editado","Exito")
        this.getProducts()
      }else if(result==2){
        this.openSnackBar("Se produjo un error al editar producto","Error")
        this.getProducts()
      }

    });

  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmComponent ,{
      width: '450px',
      data: {id:id,module:"product"},
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if(result==1){
        this.openSnackBar("Producto eliminado","Exitosa")
        this.getProducts()
      }else if(result==2){
        this.openSnackBar("Se produjo un error al eliminar producto","Error")
        this.getProducts()
      }
    });
  }

  buscar(name: any) {
    if(name.length===0){
      return this.getProducts()
    }
    this.productService.getProducByName(name)
      .subscribe((resp:any)=>{
        this.processProductResponse(resp)
      }
      )
  }
}





