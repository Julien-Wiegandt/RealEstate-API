import { QueryConfig } from "pg";
import { query } from "../db";
import { NotFoundError } from "../exceptions/NotFoundError";
import { UnauthorizedError } from "../exceptions/UnauthorizedError";
import { User } from "../users/users.interface";
import { Area, BaseHousing, Housing } from "./housings.interface";

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

export const findAllByName = async (city: string) => {
  let cityLower: string = "%" + city.toLowerCase() + "%";
  const preparedStatement = {
    name: "fetch-housing-name-id",
    text: "SELECT * FROM housings WHERE LOWER(city) LIKE $1",
    values: [cityLower],
  };
  const res = await query(preparedStatement);
  if (res.rows.length === 0) {
    throw new NotFoundError(`Housings in city : ${city} not found`);
  }
  return res.rows;
};

export const findAllInRadius = async (area: Area) => {
  const { latitude, longitude, radius } = area;
  const preparedStatement = {
    name: "fetch-all-housings",
    text: "SELECT * FROM housings",
  };
  //1 deg of latitude/longitude in km
  const degInKm = 111;
  const res = await query(preparedStatement);
  return res.rows.filter((housing: any) => {
    //Housing coordinates
    const pos = JSON.parse(housing.latlong);
    const housingLat = pos.latitude;
    const housingLong = pos.longitude;
    const deltaLat = Math.abs(+housingLat - latitude);
    const deltaLong = Math.abs(+housingLong - longitude);
    //Keep only those where the distance is below radius
    return deltaLat * degInKm < radius && deltaLong * degInKm < radius;
  });
};

export const findUserHousings = async (userId: number) => {
  const preparedStatement = {
    name: "fetch-housing-user-id",
    text: "SELECT * FROM housings WHERE userId = $1",
    values: [userId],
  };
  const res = await query(preparedStatement);
  return res.rows;
};

export const findAll = async () => {
  const preparedStatement = {
    name: "fetch-all-housings",
    text: "SELECT * FROM housings",
  };
  const res = await query(preparedStatement);
  return res.rows;
};

export const create = async (housing: BaseHousing, userId: any) => {
  const {
    title,
    email,
    street,
    city,
    postalCode,
    country,
    description,
    estatePrice,
    rent,
    estateType,
    numberBath,
    numberBed,
    phone,
    latLong,
    imgPath,
  } = housing;
  const preparedStatement: QueryConfig = {
    name: "save-housing",
    text: `INSERT INTO housings(title, email,street, city, postalCode, country,description, estatePrice, estateType, numberBath, numberBed, phone, rent, latLong, imgPath, userId) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *`,
    values: [
      title,
      email,
      street,
      city,
      postalCode,
      country,
      description,
      estatePrice,
      estateType,
      numberBath,
      numberBed,
      phone,
      rent,
      latLong,
      imgPath,
      userId,
    ],
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

export const deleteOne = async (id: string, user: User) => {
  const res = await findOne(id);
  if (res.userid === user.id) {
    const preparedStatement = {
      name: "delete-housing-id",
      text: "DELETE FROM housings WHERE id = $1",
      values: [id],
    };
    await query(preparedStatement);
    return true;
  } else {
    throw new UnauthorizedError(`You don't own this housing`);
  }
};
