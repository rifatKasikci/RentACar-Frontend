import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { OperationClaim } from '../models/operationClaim';
import { UserDetail } from '../models/userDetail';
import { LocalService } from '../services/local/local.service';
import { UserService } from '../services/user/user.service';

@Directive({
  selector: '[appAuthorized]'
})
export class AuthorizedDirective {

  private hasView = false;
  userClaims:OperationClaim[] = []
  userDetail:UserDetail

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService:UserService,
    private localService:LocalService) { 
      this.userDetail = JSON.parse(this.localService.getItem("user_details") || "")  
    }

  @Input() set appAuthorized(operationClaims: string[]) {
    this.userService.getClaimsByUserId(this.userDetail.id).subscribe((response) => {
      this.userClaims = response.data
      console.log(this.userClaims)
      this.hasAuthorization(operationClaims)
    })
  }

  hasAuthorization(operationClaims:string[]){
    let hasAuthorization:boolean = false
    operationClaims.forEach(claim => {
      if (this.userClaims.some(c=>c.name.toLocaleLowerCase()===claim.toLocaleLowerCase())) {
        hasAuthorization = true
      }
    });
    if (hasAuthorization && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef)
      this.hasView = true
    }else if(!hasAuthorization && this.hasView){
      this.viewContainer.clear()
      this.hasView = false
    }
  }
}
