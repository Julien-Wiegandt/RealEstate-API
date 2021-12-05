import { WrongTypeError } from "../exceptions/WrongTypeError";

export interface BaseHousing {
  title: string;
  address: string;
  estatePrice: number;
  estateType: string;
  rent: boolean;
  numberBath: string;
  numberBed: string;
  email: string;
  phone: string;
  description: string;
}


export interface Housing extends BaseHousing {
  id: string;
}

export function castToBaseHousing(obj: any): BaseHousing {
  if (
    obj &&
    obj.title &&
    obj.address &&
    obj.estateType &&
    obj.estatePrice &&
    obj.numberBath &&
    obj.numberBed &&
    obj.email &&
    obj.phone && obj.rent !== undefined &&
    obj.description
  ) {
    return obj as BaseHousing;
  }


  throw new WrongTypeError();
}
