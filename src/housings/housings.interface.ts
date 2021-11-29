import { WrongTypeError } from "../exceptions/WrongTypeError";

export interface BaseHousing {
  name: string;
  city: string;
  address: string;
  price: number;
  rent: boolean;
  description: string;
}

export interface Housing extends BaseHousing {
  id: string;
}

export function castToBaseHousing(obj: any): BaseHousing {
  if (
    obj &&
    obj.name &&
    obj.city &&
    obj.address &&
    obj.price &&
    obj.rent &&
    obj.description
  ) {
    return obj as BaseHousing;
  }
  throw new WrongTypeError();
}
