import { WrongTypeError } from "../exceptions/WrongTypeError";

export interface BaseUser {
  mail: string;
  password: string;
  name: string;
}

export interface User extends BaseUser {
  id: string;
}

export function castToBaseUser(obj: any): BaseUser {
  if (obj && obj.mail && obj.password && obj.name) {
    return obj as BaseUser;
  }
  throw new WrongTypeError();
}

export function isPartialUser(obj: any) {
  if (!obj || (!obj.mail && !obj.password && !obj.name)) {
    return false;
  } else {
    return true;
  }
}
