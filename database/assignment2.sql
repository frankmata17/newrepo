-- 1
INSERT INTO account (first_name, last_name, email, password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');
--2
UPDATE account
SET account_type = 'Admin'
WHERE first_name = 'Tony' AND last_name = 'Stark';
--3
DELETE FROM account
WHERE first_name = 'Tony' AND last_name = 'Stark';
--4
UPDATE inventory
SET description - REPLACE(description, 'small interiors', 'a huge interior')
WHERE make = 'GM' AND model = 'Hummer';
--5
SELECT i.make, i.model, c.classification_name
FROM inventory i
INNER JOIN classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';
--6
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images', '/images/vehicles/'),
inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');