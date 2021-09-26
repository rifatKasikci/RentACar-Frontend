import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css'],
  providers : [
    {
      provide : NG_VALUE_ACCESSOR, 
      multi : true ,
      useExisting : forwardRef(()=>TextFieldComponent)
    }
  ],
})
export class TextFieldComponent implements OnInit,ControlValueAccessor {

  public inputText = new FormControl("",Validators.required)

  private onChange:(name:string) => void
  private onTouched:() => void

  constructor() { 
  }

  writeValue(obj: any): void {
    this.inputText.setValue(obj)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  doInput() {
    this.onChange(this.inputText.value);
  }

  doBlur() {
    this.onTouched();
  }

  ngOnInit(): void {
  }

}
