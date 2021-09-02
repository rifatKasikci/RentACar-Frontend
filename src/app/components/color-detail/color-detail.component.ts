import { ToastrService } from 'ngx-toastr';
import { Color } from './../../models/color';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColorService } from 'src/app/services/color/color.service';
import { FormBuilder , Validators , FormGroup , FormControl } from '@angular/forms';

@Component({
  selector: 'app-color-detail',
  templateUrl: './color-detail.component.html',
  styleUrls: ['./color-detail.component.css']
})
export class ColorDetailComponent implements OnInit {

  colorUpdateForm:FormGroup
  color:Color

  constructor(private colorService:ColorService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["colorId"]) {
        this.getColorById(params["colorId"])
        this.createColorUpdateForm()
      }
    })
  }

  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorName:["",Validators.required]
    })
  }

  deleteColor(color:Color){
    this.colorService.delete(color).subscribe((response) => {
      this.toastrService.success("Renk silindi." , "İşlem başarılı!")
    },(responseError) => {
      if (responseError.error.Errors.length>0) {
      for (let i = 0; i < responseError.error.Errors.length; i++) {
        this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"İşlem başarısız!")
      }
    }
  })
  }

  updateColor(){
    if (this.colorUpdateForm.valid) {
      let colorModel:Color = Object.assign({},this.colorUpdateForm.value)
      colorModel.id = this.color.id
      this.colorService.update(colorModel).subscribe((response) => {
        this.toastrService.success("Renk güncellendi." , "İşlem başarılı!")
      },(responseError) => {
        if (responseError.error.Errors.length>0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"İşlem başarısız!")
          }
        }
      })
    }else{
      this.toastrService.error("Form bilgileri eksik" , "İşlem başarısız!")
    }
  }

  getColorById(id:number){
    this.colorService.getColorByColorId(id).subscribe((response) => {
      this.color = response.data
    })
  }

}
