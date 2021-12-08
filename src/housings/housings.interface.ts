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
  latLong: string;
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
      (obj.numberBath || obj.numberBath == 0) &&
      (obj.numberBed || obj.numberBed == 0) &&
      obj.email &&
      obj.phone && obj.rent !== undefined &&
      obj.description &&
      obj.latLong
  ) {
    return obj as BaseHousing;
  }

  console.log(obj &&
      obj.title &&
      obj.address &&
      obj.estateType &&
      obj.estatePrice &&
      (obj.numberBath || obj.numberBath == 0) &&
      (obj.numberBed || obj.numberBed == 0) &&
      obj.email &&
      obj.phone && obj.rent !== undefined &&
      obj.description &&
      obj.latLong)
  throw new WrongTypeError();
}
