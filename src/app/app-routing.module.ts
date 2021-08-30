import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';
import { ColorComponent } from './components/color/color.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarComponent } from './components/car/car.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';

const routes: Routes = [
  {path: "",component: CarComponent},
  {path : "cars/brand/:brandId",component : CarComponent},
  {path : "cars/color/:colorId",component : CarComponent},
  {path : "cars/detail/:carId",component : CarDetailComponent},
  {path : "brands" , component : BrandComponent},
  {path : "colors" , component : ColorComponent},
  {path : "rentals" , component : RentalComponent},
  {path : "cars/brand/:brandId/color/:colorId" , component : CarComponent},
  {path : "cars/detail/rent/:rental" , component : PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
