import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { CategoryElement } from './CategoryElement';
import { MatDialog } from '@angular/material/dialog';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private categoryService:CategoryService,
              public dialog: MatDialog,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.getCategories()
  }

  displayedColumns:string[]=['id','name','description','actions']
  dataSource=new MatTableDataSource<CategoryElement>()

  @ViewChild(MatPaginator)
  paginator!:MatPaginator

  getCategories(){
    this.categoryService.getCategories()
      .subscribe((data:any)=>{
        console.log("respuesta categories: ",data)
        this.procesarCategoriasResponse(data)
      },(error:any)=>{
        console.log("error",error)
      })
  }

  procesarCategoriasResponse(resp:any){
    const dataCategory: CategoryElement[]=[]
    if(resp.metadata[0].code== "00"){
      let listCategory=resp.categoryResponse.category
      listCategory.forEach((element:CategoryElement) => {
          dataCategory.push(element)
      });
      this.dataSource=new MatTableDataSource<CategoryElement>(dataCategory)
      this.dataSource.paginator=this.paginator
    }
  }

  openCategoryDialog(): void {

      const dialogRef = this.dialog.open(NewCategoryComponent, {
        width: '450px'
        //data: {name: this.name, animal: this.animal},
      });

      dialogRef.afterClosed().subscribe((result:any) => {
        if(result==1){
          this.openSnackBar("Categoria Agregada","Exito")
          this.getCategories()
        }else if(result==2){
          this.openSnackBar("Se produjo un error al guardar categoria","Error")
          this.getCategories()
        }

      });
  }

  edit(id: number,name: string,description: string) {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
        width: '450px',
        data: {id:id,name: name, description: description},
    });

    dialogRef.afterClosed().subscribe((result:any) => {

      if(result==1){
        this.openSnackBar("Categoria Actualizada","Exito")
        this.getCategories()
      }else if(result==2){
        this.openSnackBar("Se produjo un error al actualizar categoria","Error")
        this.getCategories()
      }

    });
  }

  buscar(palabra: string) {
    if(palabra.length===0){
      return this.getCategories()
    }
    return this.categoryService.getCategoryById(palabra)
            .subscribe((resp:any)=>{
               this.procesarCategoriasResponse(resp)
            })
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '300px',
      data: {id:id},
  });

  dialogRef.afterClosed().subscribe((result:any) => {

    if(result==1){
      this.openSnackBar("Categoria Eliminada","Exito")
      this.getCategories()
    }else if(result==2){
      this.openSnackBar("Se produjo un error al eliminar categoria","Error")
      this.getCategories()
    }

  });

  }


  openSnackBar(message:string,action:string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message,action,{
      duration: 2000
    })
  }




}
