-- CREATE database bamazon_db;
USE bamazon_db;
CREATE TABLE products(
    item_id INT(255) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10, 2) NULL,
    stock_quantity INT(255) NOT NULL,
    PRIMARY KEY(item_id)
);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("SONY-TV", "ELECTRONICS", 1999.75, 150),
("LAYS", "SNACKS", 5, 1000),
("OLAY", "BEAUTY", 15, 500),
("COSCOBALL", "SPORTS", 80, 500),
("BARBIE", "TOYS", 50, 700),
("BODYWASH-DOVE", "BATH", 10, 500),
("GIFT-CARDS", "GIFTS", 200, 650),
("GRAPHIC-T", "CLOTHING", 25, 500),
("ADIDAS-SHOE", "SHOES", 150, 500),
("HANDBAGS", "FASHION", 70, 500);

SELECT * FROM products;