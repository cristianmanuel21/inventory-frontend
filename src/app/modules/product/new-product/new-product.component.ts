import { Component, OnInit , Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../shared/services/product.service';
import { CategoryService } from '../../shared/services/category.service';
import { CategoryElement } from '../../category/components/category/CategoryElement';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

ngOnInit(): void {
  this.getCategories()
}


public productForm:FormGroup
estadoFormulario:string=""
categories:CategoryElement[]=[]
selectedFiles:any
nameImg:string=""

constructor(private fb:FormBuilder,private categoryService:CategoryService,
private productService:ProductService,
private dialogRef:MatDialogRef<NewProductComponent>,
@Inject(MAT_DIALOG_DATA) public data:any)
{
    this.estadoFormulario="Agregar"
    this.productForm=this.fb.group({
    name:['',Validators.required],
    price:['',Validators.required],
    account:['',Validators.required],
    category:['',Validators.required],
    picture:['',Validators.required]
  })
}

onCancel() {
    this.dialogRef.close(3)
}

onSave() {
  let data={
    name:this.productForm.get('name')?.value,
    price:this.productForm.get('price')?.value,
    account:this.productForm.get('account')?.value,
    category:this.productForm.get('category')?.value,
    picture:this.selectedFiles
  }

  const uploadImageData = new FormData()
  uploadImageData.append('picture',data.picture,data.picture.name)
  uploadImageData.append('name',data.name)
  uploadImageData.append('price',data.price)
  uploadImageData.append('account',data.account)
  uploadImageData.append('categoryId',data.category)

  //call the productService
  this.productService.saveProduct(uploadImageData)
      .subscribe((data:any)=>{
        this.dialogRef.close(1)
      },(error:any)=>{
        this.dialogRef.close(2)
      })



}

getCategories(){
  this.categoryService.getCategories()
    .subscribe((data:any)=>{
      this.categories=data.categoryResponse.category;

    }, (error:any)=>{
      console.log("error al consultar categorias")
    })
}

onFileChanged(event: any) {
  this.selectedFiles=event.target.files[0]
  console.log(this.selectedFiles)
  this.nameImg=event.target.files[0].name
}


}
