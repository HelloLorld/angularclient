import {Type} from './type.model';
import {Hotel} from './hotel.model';

export class Tour {
  id: number;
  description: string;
  type: Type;
  hotel: Hotel;
}
