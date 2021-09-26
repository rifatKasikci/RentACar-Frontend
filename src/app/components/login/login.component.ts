import { UserService } from './../../services/user/user.service';
import { UserDetail } from './../../models/userDetail';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LocalService } from 'src/app/services/local/local.service';
import { OperationClaim } from 'src/app/models/operationClaim';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  userDetail:UserDetail

  constructor(private authService:AuthService,
    private userService:UserService,
    private localService:LocalService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
   if (this.loginForm.valid) {
    let loginModel = Object.assign({},this.loginForm.value) 
    this.authService.login(loginModel).subscribe((response) => {
      console.log(response)
      this.toastrService.info(response.message , "Bilgilendirme!")
      this.localService.add("token" , response.data.token)
      this.getUserDetails()
    },(responseError) => {
      this.toastrService.error(responseError.error , "İşlem başarısız!")
    })
   }else{
    this.toastrService.error("Form bilgileri eksik." , "İşlem başarısız!")
   }
  }

  getUserClaims(){
    this.userService.getClaimsByUserId(this.userDetail.id).subscribe((response)=>{
      let claim:OperationClaim = response.data[0]
      console.log(claim)
      this.localService.add("user_claim",JSON.stringify(claim.name))
      console.log("claimadded")
    })
  }

  getUserDetails(){
    this.userService.getUserDetailsByEmail(this.loginForm.value.email).subscribe((response) => { 
      this.userDetail = response.data
      console.log("here")
      this.getUserClaims()
      this.localService.add("user_details" , JSON.stringify(this.userDetail))
      window.location.reload()
      this.router.navigate([""]) 
    })
  }

}
