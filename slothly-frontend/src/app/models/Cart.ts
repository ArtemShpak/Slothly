import {Material} from './Material';

export interface Cart {
  id: number;
  user: any;
  materials: Material[];
}
