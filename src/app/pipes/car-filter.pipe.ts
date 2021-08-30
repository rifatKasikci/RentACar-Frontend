import { Car } from 'src/app/models/car';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carFilter'
})
export class CarFilterPipe implements PipeTransform {

  transform(value: Car[], filterText:string): Car[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : ""
    return filterText ? value.filter((car:Car) => 
    car.carName.toLocaleLowerCase().indexOf(filterText) !== -1) : value
  }

}
