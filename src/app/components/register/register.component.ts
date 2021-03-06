import { RegisterModel } from './../../models/registerModel';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , Validators , FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalService } from 'src/app/services/local/local.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { UserDetail } from 'src/app/models/userDetail';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup
  userDetail:UserDetail

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private userService:UserService,
    private localService:LocalService,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required],
      passwordRepeat:["",Validators.required],   
    })
  }

  register(){
    if (this.registerForm.valid) {
      if (this.registerForm.value.password === this.registerForm.value.passwordRepeat) {
        let registerModel:RegisterModel = Object.assign({} , this.registerForm.value)

      this.authService.register(registerModel).subscribe((response) => {
        console.log(response)
        this.router.navigate(["/"])
        this.toastrService.success("Hesap oluşturuldu" , "İşlem başarılı!")
        this.toastrService.info("Giriş yapıldı." , "Bilgilendirme!")
        this.localService.add("token" , response.data.token)
        this.userService.getUserDetailsByEmail(this.registerForm.value.email).subscribe((response) => { 
          this.userDetail = response.data
          this.localService.add("user_details" , JSON.stringify(this.userDetail))
          window.location.reload()
          this.router.navigate(["/cars"]) 
        })
      },(responseError) => {
        this.toastrService.error(responseError.error , "İşlem başarısız!");
        
      })
      }else{
        this.toastrService.error("Şifre ve şifre tekrarı eşleşmiyor. Lütfen tekrar deneyiniz." , "İşlem başarısız!")
      }
      
    }else{
      this.toastrService.error("Form bilgileri eksik." , "İşlem başarısız!")
    }
  }

}
