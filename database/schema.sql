DROP DATABASE IF EXISTS photos;

CREATE DATABASE photos;

USE photos;

CREATE TABLE products(
  id INT PRIMARY KEY AUTO_INCREMENT,
  productName VARCHAR(255),
  images VARCHAR(20)
  
);

INSERT INTO photos.products (id, productName, images) VALUES (1, 'product', 'urls');
