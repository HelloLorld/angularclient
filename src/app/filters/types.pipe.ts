import { Pipe, PipeTransform } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Tour} from '../model/tour.model';

@Pipe({
  name: 'types'
})
export class TypesPipe implements PipeTransform {

  transform(tours: Tour[], formGroup: FormGroup, trash: any): Tour[] {
    const setOfTypes = new Set<string>();
    if (formGroup.get('hit').value) { setOfTypes.add('Хит'); }
    if (formGroup.get('sale').value) { setOfTypes.add('Скидка');  }
    if (formGroup.get('casual').value) { setOfTypes.add('Обычный');  }
    if (formGroup.get('hot').value) { setOfTypes.add('Горящий');  }
    if (setOfTypes.size === 0) { return tours; }
    return tours.filter( tour => {
      return setOfTypes.has(tour.type.type);
    });
  }

}
