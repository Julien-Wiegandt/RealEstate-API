export interface BaseUser {
  mail: string;
  password: string;
}

export interface User extends BaseUser {
  id: string;
}
