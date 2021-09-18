import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { LocalService } from '../services/local/local.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService,
    private localService:LocalService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.localService.getItem("token")
    let newRequest : HttpRequest<any>
    newRequest = request.clone({
      headers : request.headers.set("Authorization" , "Bearer " + token)
    })
    return next.handle(newRequest);
  }
}
