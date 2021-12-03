import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { QueryConfig } from "pg";
import { query } from "../db";
import { NotFoundError } from "../exceptions/NotFoundError";
import { UniqueError } from "../exceptions/UniqueError";
import { BaseUser, User } from "../users/users.interface";
import { Credentials } from "./auth.interface";

export const login = async (credentials: Credentials) => {
  const preparedStatement: QueryConfig = {
    name: "check-user-mail",
    text: "SELECT * FROM users u WHERE u.mail = $1",
    values: [credentials.mail],
  };
  const res = await query(preparedStatement);
  if (res.rows[0]) {
    const user: User = res.rows[0];
    if (await checkPassword(credentials.password, user.password)) {
      return generateToken(user);
    } else {
      throw new NotFoundError(`No match for these credentials`);
    }
  }
  throw new NotFoundError(`No match for these credentials`);
};

const generateToken = (user: User) => {
  const { password, ...userData } = user;
  const tokenPayload = {
    sub: user.id,
    user: userData,
    access_token: true,
  };
  return sign(tokenPayload, process.env.JWT_KEY!, { expiresIn: "1h" });
};

const checkPassword = async (
  plainTextPassword: string,
  hashedPassword: string
) => {
  return await compare(plainTextPassword, hashedPassword);
};

const hashPassword = async (str: string) => {
  const saltRounds = 10;
  return await hash(str, saltRounds);
};

export const register = async (user: BaseUser) => {
  const hashedPassword = await hashPassword(user.password);
  const preparedStatement: QueryConfig = {
    name: "save-user",
    text: `INSERT INTO users(mail,password,name) VALUES ($1,$2,$3) RETURNING *`,
    values: [user.mail, hashedPassword, user.name],
  };
  try {
    const res = await query(preparedStatement);
    const { password, ...userData } = res.rows[0];
    return userData;
  } catch (err: any) {
    if (err && err.code && err.code === "23505") {
      throw new UniqueError(err.detail);
    }
    throw err;
  }
};
