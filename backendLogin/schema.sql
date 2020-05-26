CREATE DATABASE DiceRollerz_db;

USE DiceRollerz_db;


CREATE TABLE user (
  
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
 
  username VARCHAR(255) NOT NULL,
  
  password VARCHAR(255) NOT NULL
);