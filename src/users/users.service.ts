import { hashPassword } from "../auth/auth.service";
import { query } from "../db";
import { NotFoundError } from "../exceptions/NotFoundError";
import { BaseUser } from "./users.interface";

export const findOne = async (id: string) => {
  const preparedStatement = {
    name: "fetch-user-id",
    text: "SELECT * FROM users WHERE id = $1",
    values: [id],
  };
  const res = await query(preparedStatement);
  if (res.rows.length === 0) {
    throw new NotFoundError(`User id : ${id} not found`);
  }
  const { password, ...user } = res.rows[0];
  return user;
};

export const findAll = async () => {
  const preparedStatement = {
    name: "fetch-all-users",
    text: "SELECT * FROM users",
  };
  const res = await query(preparedStatement);
  return res.rows.map((user) => {
    const { password, ...userData } = user;
    return userData;
  });
};

export const update = async (id: string, user: BaseUser) => {
  const hashedPass = await hashPassword(user.password);
  const preparedStatement = {
    name: "update-user",
    text: "UPDATE users SET mail = $1, password = $2, name = $3 WHERE id = $4",
    values: [user.mail, hashedPass, user.name, id],
  };
  const res = await query(preparedStatement);
  return res.rowCount === 1;
};

export const deleteOne = (id: string) => {
  return true;
};
