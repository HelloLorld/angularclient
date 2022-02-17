import {Tour} from './tour.model';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  tours: Tour[];
}
