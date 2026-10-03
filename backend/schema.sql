SELECT * FROM expenses;
CREATE TABLE expenses(
 id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
 title VARCHAR (120) NOT NULL,
 amount NUMERIC (10,4) NOT NULL,
 category VARCHAR (120) NOT NULL,
 date DATE NOT NULL 
);

ALTER TABLE expenses
ADD CONSTRAINT check_amount
CHECK (amount > 0);

ALTER TABLE expenses
ADD CONSTRAINT check_category
CHECK (category IN ('Food','Transport','Bills','Entertaiment','Other'));