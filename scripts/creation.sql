DROP TABLE IF EXISTS USERS;
DROP TABLE IF EXISTS HOUSINGS;
DROP TABLE IF EXISTS USERS_HOUSINGS;

CREATE TABLE HOUSINGS (
    id int GENERATED PRIMARY KEY not null,
    name varchar not null,
    city varchar not null,
    address varchar not null,
    price float not null,
    rent boolean not null
);

CREATE TABLE USERS (
    id int GENERATED PRIMARY KEY not null,
    mail varchar UNIQUE not null,
    password varchar not null
);

CREATE TABLE USERS_HOUSINGS (
    id_user int not null,
    id_housing int not null,
    CONSTRAINT fk_user
        FOREIGN KEY (id_user)
            REFERENCES USERS(id),
    CONSTRAINT fk_housing
        FOREIGN KEY (id_housing)
            REFERENCES HOUSINGS(id),
    PRIMARY KEY (id_user,id_housing)
)