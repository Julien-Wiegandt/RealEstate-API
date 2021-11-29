DROP TABLE IF EXISTS USERS;
DROP TABLE IF EXISTS HOUSINGS;

CREATE TABLE USERS (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY not null,
    mail varchar UNIQUE not null,
    password varchar not null
);

CREATE TABLE HOUSINGS (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY not null,
    name varchar not null,
    city varchar not null,
    address varchar not null,
    price float not null,
    rent boolean not null,
    description text not null,
    id_user int not null,
    CONSTRAINT fk_user
      FOREIGN KEY(id_user)
	  REFERENCES USERS(id)
);