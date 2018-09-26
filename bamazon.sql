drop database if exists bamazon;
create database bamazon;

use bamazon;
create table products (
    item_id int not null auto_increment,
    product_name varchar (65) not null,
    department_name varchar (65) not null,
    price DOUBLE (6,2) not null,
    stock_quantity int not null,
    primary KEY (item_id)
);

INSERT INTO products (item_id, department_name, product_name, price, stock_quantity)
VALUES (1000,"NO SALE", "NO SALE", 0.01, 0);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Books", "48 Laws of Power", 34.99, 100);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Home", "Area rug", 124.99, 100);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Electronics", "Sony Walkman", 54.99, 100);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Outdoors", "Coleman Sundome 6-Person Dome Tent", 154.99, 83);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Personal hygene", "Dr Teal's Body Wash", 10.01, 270);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Cell Phones", "Google Pixel 2XL", 834.99, 100);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Home", "Accent Chair", 124.99, 97);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Electronics", "Ipad Air", 454.99, 100);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Outdoors", "River Tube", 24.99, 383);


INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Electronics", "Sony MP3 Player", 74.99, 100);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Outdoors", "Coleman Sundome 4-Person Dome Tent", 114.99, 83);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Personal hygiene", "Dr Teal's Epson Salt", 10.99, 270);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Cell Phones", "Google Pixel 2", 634.99, 70);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Home", "Gas grill", 124.99, 77);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Electronics", "Ipad Air 2", 494.99, 100);

INSERT INTO products (department_name, product_name, price, stock_quantity)
VALUES ("Outdoors", "2-Person River Tube", 31.99, 383);