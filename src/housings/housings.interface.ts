import { WrongTypeError } from "../exceptions/WrongTypeError";

export interface BaseHousing {
  title: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  estatePrice: number;
  estateType: string;
  rent: boolean;
  numberBath: string;
  numberBed: string;
  email: string;
  phone: string;
  description: string;
  latLong: string;
  imgPath: string;
}

export interface Housing extends BaseHousing {
  id: string;
}

export function castToBaseHousing(obj: any): BaseHousing {
  if (
    obj &&
    obj.title &&
    obj.street &&
    obj.city &&
    obj.postalCode &&
    obj.country &&
    obj.estateType &&
    obj.estatePrice !== undefined &&
    (obj.numberBath || obj.numberBath == 0) &&
    (obj.numberBed || obj.numberBed == 0) &&
    obj.email &&
    obj.phone &&
    obj.rent !== undefined &&
    obj.description &&
    obj.latLong &&
    obj.imgPath
  ) {
    return obj as BaseHousing;
  }
  throw new WrongTypeError();
}

export interface Area {
  latitude: number;
  longitude: number;
  radius: number;
}

export function castToArea(obj: any) {
  if (
    obj &&
    !isNaN(Number(obj.latitude)) &&
    !isNaN(obj.longitude) &&
    !isNaN(obj.radius)
  ) {
    return obj as Area;
  }
  throw new WrongTypeError();
}
