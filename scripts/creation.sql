DROP TABLE IF EXISTS HOUSINGS;
DROP TABLE IF EXISTS USERS;

CREATE TABLE USERS (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY not null,
    name varchar not null,
    mail varchar UNIQUE not null,
    password varchar not null
);

CREATE TABLE HOUSINGS (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY not null,
    title varchar not null,
    street varchar not null,
    city varchar not null,
    postalCode varchar not null,
    country varchar not null,
    estatePrice float not null,
    estateType varchar not null,
    rent boolean not null,
    numberBath int not null,
    numberBed int not null,
    email varchar not null,
    phone varchar not null,
    description text not null,
    latLong varchar not null,
    imgPath varchar not null,
    userId int not null,
    CONSTRAINT fk_user
      FOREIGN KEY(userId)
	  REFERENCES USERS(id)
);