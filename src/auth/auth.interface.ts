import { WrongTypeError } from "../exceptions/WrongTypeError";

export interface Credentials {
  mail: string;
  password: string;
}

export function castToCredentials(obj: any): Credentials {
  if (obj && obj.mail && obj.password) {
    return obj as Credentials;
  }
  throw new WrongTypeError();
}
