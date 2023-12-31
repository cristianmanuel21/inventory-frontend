import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

   constructor(public dialogRef:MatDialogRef<ConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any, private categoryService:CategoryService) { }

  ngOnInit(): void {

  }

  onDelete() {
    if(this.data!=null){
      this.categoryService.delete(this.data.id)
        .subscribe((data:any)=>{
          this.dialogRef.close(1)
        },(error)=>{
          this.dialogRef.close(2)
        })
    }else{
      this.dialogRef.close(2)
     }
  }

  onNoClick() {
    this.dialogRef.close(3)
  }

}
