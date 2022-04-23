# Cruz Distribuidora

<p>
    <img src="public/assets/img/wallpaper.png">
</p>

## Overview
The main purpose of this project is to create a webpage to a cliente about medical supplies.

<hr>

## Libraries 

- Alert => Show info messages;
- Bcrypt => Crypt password;
- Body-parser => Bypass json data;
- DotEnv => Work with envkeys;
- EJS => Render HTML;
- Express => Flexible framework;
- Express-session => create specific routes for admins controller;
- Mysql2 => Data base;
- Nodemailer => Send e-mail;
- Nodemon => Update server when save;
- Sequelize => Manipulate database;
- Slugify => Replaces spaces with hyphen from saved text;

<hr>

## Configuring database

1. Add `.env` file into main folder, and put:

    - `DATABASE_PASSWORD = YourPassword`
    - `DATABASE_USER = root`
    - `DATABASE_TABLE = distribuidora`
    - `DATABASE_HOST = localhost`
    - `DATABASE_DIALECT = mysql`
    - `DATABASE_TIMEZONE = -03:00`
    - `SESSION_SECRET = YourPassword`
    - `PORT = 3000`

<br>

2. Go into the terminal and type: `/usr/local/mysql/bin/mysql -u root -p`;

3. Put your root password

4. Create the data base: `CREATE DATABASE distribuidora;`

5. Exit from mysql>:`exit`

<hr>

## Running the application

- Run: `npm install`;
- Run: `npm start`;
<hr>

## Routes

- Main: `http://localhost:3000/`;

# Need admin access

- List of users: `http://localhost:3000/admin/users`;
- List of suppliers: `http://localhost:3000/admin/suppliers`;
- List of products: `http://localhost:3000/admin/products`;

<hr>

## Licenses
<br>
<p>
    <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white">
</p>
