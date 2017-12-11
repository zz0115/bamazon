DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(65,4) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Rich Dad Poor Dad", "Book", 7.19, 1000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Economix", "Book", 13.68, 3000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Heat Resistant Glass Pitcher", "Houseware", 15.99, 2000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Leaf Scoops", "Garden", 13.76, 6000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Snow Shovel", "Garden", 24.49, 8000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("ThermoPro", "Houseware", 9.49, 4000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Wall Mount for TV", "Electronics Supply", 20.95, 1000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Rich Dad Poor Dad", "Book", 7.19, 1000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Oil Spray", "Houseware", 3.97, 3000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("iPhone Case", "Electronics Supply", 7.99, 10000);

SELECT * FROM products;