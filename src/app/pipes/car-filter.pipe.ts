import { CarDetail } from './../models/carDetail';
import { Car } from 'src/app/models/car';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carFilter'
})
export class CarFilterPipe implements PipeTransform {

  transform(value: CarDetail[], filterText:string): CarDetail[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : ""
    return filterText ? value.filter((carDetail:CarDetail) => 
    carDetail.carName.toLocaleLowerCase().indexOf(filterText) !== -1) : value
  }

}
