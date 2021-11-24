import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { query } from "../db";
import { BaseUser, User } from "../users/users.interface";
import { Credentials } from "./auth.interface";

export const login = async (credentials: Credentials) => {
  const res = await query("SELECT * FROM users u WHERE u.mail = $1", [
    credentials.mail,
  ]);
  if (res.rows[0]) {
    const user: User = res.rows[0];
    if (await checkPassword(credentials.password, user.password)) {
      return generateToken(user);
    }
  }
  throw new Error("not found");
};

const generateToken = (user: User) => {
  const { password, ...userData } = user;
  const tokenPayload = {
    sub: user.id,
    user: userData,
    accessToken: true,
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
  try {
    const hashedPassword = await hashPassword(user.password);
    const res = await query(
      "INSERT INTO users (mail,password) VALUES ($1,$2)",
      [user.mail, hashedPassword]
    );
    const { password, ...userData } = res.rows[0];
    return userData;
  } catch (err) {
    throw new Error();
  }
};
