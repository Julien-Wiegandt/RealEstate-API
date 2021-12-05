import { QueryConfig } from "pg";
import { query } from "../db";
import { NotFoundError } from "../exceptions/NotFoundError";
import { BaseHousing, Housing } from "./housings.interface";

export const findOne = async (id: string) => {
  const preparedStatement = {
    name: "fetch-housing-id",
    text: "SELECT * FROM housings WHERE id = $1",
    values: [id],
  };
  const res = await query(preparedStatement);
  if (res.rows.length === 0) {
    throw new NotFoundError(`Housing id : ${id} not found`);
  }
  return res.rows[0];
};

export const findAll = async () => {
  const preparedStatement = {
    name: "fetch-all-housings",
    text: "SELECT * FROM housings",
  };
  try {
    const res = await query(preparedStatement);
    return res.rows;
  } catch (err) {
    throw Error();
  }
};

export const create = async (housing: BaseHousing, userId: any) => {
  const { title, email, address, description, estatePrice, rent, estateType, numberBath, numberBed, phone} = housing;
  console.log(housing)
  const preparedStatement: QueryConfig = {
    name: "save-housing",
    text: `INSERT INTO housings(title,email,address,description,estateprice,estatetype,numberbath,numberbed,phone,rent,id_user) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
    values: [title, email, address, description, estatePrice,estateType,numberBath,numberBed,phone, rent, userId],
  };
  try {
    const res = await query(preparedStatement);
    return res.rows[0];
  } catch (e) {
    console.error(e);
    throw Error();
  }
};

export const update = (id: string, housing: Housing) => {
  return true;
};

export const deleteOne = (id: string) => {
  return true;
};
