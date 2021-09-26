import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { PaymentComponent } from './components/payment/payment.component';

import { ToastrModule } from 'ngx-toastr';
import { CarAddComponent } from './components/car-add/car-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrandDetailComponent } from './components/brand-detail/brand-detail.component';
import { ColorDetailComponent } from './components/color-detail/color-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NaviComponent } from './components/navi/navi.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthorizedDirective } from './directives/authorized.directive';
import { TextFieldComponent } from './custom-controls/text-field/text-field.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    CarComponent,
    RentalComponent,
    CarDetailComponent,
    BrandFilterPipe,
    ColorFilterPipe,
    CarFilterPipe,
    CarFilterComponent,
    PaymentComponent,
    CarAddComponent,
    BrandAddComponent,
    ColorAddComponent,
    BrandDetailComponent,
    ColorDetailComponent,
    LoginComponent,
    RegisterComponent,
    NaviComponent,
    UserProfileComponent,
    AuthorizedDirective,
    TextFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right"
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
