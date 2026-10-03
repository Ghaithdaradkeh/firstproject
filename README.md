                                  # Expense Tracker

This project is a full-stack expense tracker. It allows the user to add, view, edit, delete, and filter expenses. The data is stored in PostgreSQL, and the frontend communicates with the 
backend through an API.
--------------------------------------------------------------------------------------------------------------------------------------------------------
                                                          ##How to Run the Project
     1- Create a PostgreSQL database named:expense_tracker
           Open backend/schema.sql in pgAdmin and run it on the expense_tracker database.
     2-Create the .env File
           Add your PostgreSQL connection details to the .env
  3-Install the Packages
     Open the terminal inside the backend folder and run:npm install
    4-Start the Backend
     Run this command inside the backend folder:npm start
  5-Open the Frontend
          Open frontend/index.html using Live Server in VS Code.
--------------------------------------------------------------------------------------------------------------------------------------------------------
                                                            ## Technologies Used
- HTML
- CSS
- Bootstrap
- JavaScript
- Node.js
- Express
- PostgreSQL
--------------------------------------------------------------------------------------------------------------------------------------------------------
                               ## Project Structure
   text
expense-tracker/
     frontend/
         index.html
         css
             style.css
         js
             app.js
         images
     backend/
         server.js
         schema.sql
         package.json
         package-lock.json
         .env.example
     screenshots/
     README.md
--------------------------------------------------------------------------------------------------------------------------------------------------------
                          ##The Most Difficult Part

The most difficult part was understanding how the frontend communicates with the 
backend using fetch/async/await

I solved this by understanding the sequence: the frontend sends a request to the Express 
backend, the backend communicates with PostgreSQL, and then the result is returned to 
the frontend as JSON.

--------------------------------------------------------------------------------------------------------------------------------------------------------
                               ##Demo Video

https://drive.google.com/file/d/1jbzsTnTjFGQ886vdP3s-JrUUBnJZNpAi/view?usp=sharing


--------------------------------------------------------------------------------------------------------------------------------------------------------
                           ##GitHub Repository

https://github.com/Ghaithdaradkeh/firstproject