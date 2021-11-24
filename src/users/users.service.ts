import { query } from "../db";
import { BaseUser } from "./users.interface";

export const findOne = async (id: string) => {
  const res = await query("SELECT * FROM users u WHERE u.id = $1", [id]);
  const { password, ...user } = res.rows[0];
  return user;
};

export const findAll = async () => {
  const res = await query("SELECT * FROM users", []);
  return res.rows.map((user) => {
    const { password, ...userData } = user;
    return userData;
  });
};

export const update = (id: string, user: BaseUser) => {
  return true;
};

export const deleteOne = (id: string) => {
  return true;
};
