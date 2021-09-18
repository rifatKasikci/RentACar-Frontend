import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  constructor() { }

  add(key:string , value:any){
    localStorage.setItem(key , value)
  }

  update(key:string , value:string){
    localStorage.removeItem(key)
    localStorage.setItem(key , value)
  }

  delete(key:string){
    localStorage.removeItem(key)
  }

  getItem(key:string):string | null{
   return localStorage.getItem(key)
  }
}
