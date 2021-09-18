import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './components/login/login.component';
import { ColorDetailComponent } from './components/color-detail/color-detail.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarComponent } from './components/car/car.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandDetailComponent } from './components/brand-detail/brand-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  {path: "",component: CarComponent},
  {path: "cars",component: CarComponent},
  {path : "cars/brand/:brandId",component : CarComponent},
  {path : "cars/color/:colorId",component : CarComponent},
  {path : "cars/brand/:brandId/color/:colorId" , component : CarComponent},
  {path : "cars/detail/:carId",component : CarDetailComponent},
  {path : "cars/add" , component : CarAddComponent , canActivate : [LoginGuard]},
  {path : "brands" , component : BrandComponent},
  {path : "brands/add" , component : BrandAddComponent},
  {path : "brands/detail/:brandId" , component : BrandDetailComponent},
  {path : "colors" , component : ColorComponent},
  {path : "colors/detail/:colorId" , component : ColorDetailComponent},
  {path : "colors/add" , component : ColorAddComponent},
  {path : "rentals" , component : RentalComponent},
  {path : "cars/detail/rent/:rental" , component : PaymentComponent , canActivate : [LoginGuard]},
  {path : "login", component : LoginComponent},
  {path : "register" , component : RegisterComponent},
  {path : "profile" , component : UserProfileComponent , canActivate : [LoginGuard]}





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
