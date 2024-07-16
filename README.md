# Sleep Study Tracker
A fullstack app created for a sleep doctor's practice. This tracks home sleep studies administered to patients. Add patients to a database along with details of their sleep studies.

**Link to project:**  https://sleep-study-tracker.onrender.com <br> (Please note: Host may take up to a few minutes to load)

**Demo User** <br>
Email: user@test.com <br>
Password: tester123

![Sleep study tracker gif](https://i.imgur.com/vrgWCPA.gif)

## How It's Made:

**Tech used:** HTML, CSS, Tailwind, JavaScript, Node.js, Express, MongoDB

For the frontend, I used HTML, CSS, and Tailwind to create the UI of the app. The backend was created using Node.js with the Express framework. To create my database, I used MongoDB. For user authentication, I implemented Passport.js.

---

# Optimizations

React can be implemented to further optimize and enhance the user experience when marking studies complete, making the application more seamless and fluid. A notification system still needs to be added to alert users of studies being assigned to them.

---

# Packages/Dependencies used 

bcrypt, connect-mongo, dotenv, ejs, express, express-flash, express-session, mongodb, mongoose, morgan, nodemon, passport, passport-local, validator

---

# Install all the dependencies or node packages used for development via Terminal

`npm install` 

---

# Things to add

- Create a `.env` file and add the following as `key: value` 
  - PORT: 9000 (can be any port example: 3000) 
  - DB_STRING: `your database URI` 
