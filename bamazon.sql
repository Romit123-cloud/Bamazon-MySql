CREATE DATABASE Bamazon_db;
USE Bamazon_db;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(11) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ('Cup Ramen Noodle', 'Grocery', 5.00, 50),
		('BAPE zip-up hoodie', 'Clothing', 250.00, 1),
		('GameCube Spice-Orange Japan edition', 'Electronics', 399.99, 1),
		('Stone Island Puffer Coat', 'Clothing', 755.00, 1),
		('SSJ4 Goku Wax-Resin figurine', 'Collectibles', 329.99, 1),
		('Frosted Flakes', 'Grocery', 3.99, 1),
		('Playstation 4 White Destiny 2 edition', 'Electronics', 499.99, 1),
		('Doritos Spicy Nachos party size', 'Grocery', 6.59, 2),
		('Nike-tech fleece jogger sweatpants', 'Clothing', 59.99, 1),
		('Sasuke Rinnegan Wax-Resin figurine', 'Collectibles', 289.99, 1),
		('Apple Airpods V2 w/charging case', 'Electronics', 199.99, 1),
		('Nesquik strawberry milk', 'Grocery', 29.99, 30);
