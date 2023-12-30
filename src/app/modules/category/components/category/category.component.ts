import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { CategoryElement } from './CategoryElement';
import { MatDialog } from '@angular/material/dialog';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

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


  openSnackBar(message:string,action:string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message,action,{
      duration: 2000
    })
  }




}
