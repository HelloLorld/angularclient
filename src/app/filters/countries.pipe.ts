import { Pipe, PipeTransform } from '@angular/core';
import {Tour} from '../model/tour.model';
import {FormGroup} from '@angular/forms';

@Pipe({
  name: 'countries'
})
export class CountriesPipe implements PipeTransform {

  transform(tours: Tour[], formGroup: FormGroup, trash: any): unknown {
    const setOfCountries = new Set<string>();
    if (formGroup.get('russia').value) { setOfCountries.add('Россия'); }
    if (formGroup.get('china').value) { setOfCountries.add('Китай'); }
    if (formGroup.get('ukraine').value) { setOfCountries.add('Украина'); }
    if (formGroup.get('german').value) { setOfCountries.add('Германия'); }
    if (formGroup.get('usa').value) { setOfCountries.add('США'); }
    if (formGroup.get('greatBritain').value) { setOfCountries.add('Великобритания'); }
    if (formGroup.get('kazakhstan').value) { setOfCountries.add('Казахстан'); }
    if (setOfCountries.size === 0) { return tours; }
    return tours.filter( tour => {
      return setOfCountries.has(tour.hotel.city.country.name);
    });
  }
}
