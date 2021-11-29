import { WrongTypeError } from "../exceptions/WrongTypeError";

export interface BaseUser {
  mail: string;
  password: string;
}

export interface User extends BaseUser {
  id: string;
}

export function castToBaseUser(obj: any): BaseUser {
  if (obj && obj.mail && obj.password) {
    return obj as BaseUser;
  }
  throw new WrongTypeError();
}
