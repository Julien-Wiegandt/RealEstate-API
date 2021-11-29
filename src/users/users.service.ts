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
  try {
    const res = await query(preparedStatement);
    return res.rows.map((user) => {
      const { password, ...userData } = user;
      return userData;
    });
  } catch (err) {
    console.error(err);
    throw Error();
  }
};

export const update = (id: string, user: BaseUser) => {
  return true;
};

export const deleteOne = (id: string) => {
  return true;
};
