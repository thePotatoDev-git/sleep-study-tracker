# Sleep Study Tracker
A fullstack app created for a sleep doctor's practice. This tracks home sleep studies administered to patients. Add patients to a database along with details of their sleep studies.

**Link to project:** https://hst-tracker.herokuapp.com/

![Sleep study tracker gif](https://i.imgur.com/vrgWCPA.gif)

## How It's Made:

**Tech used:** HTML, CSS, Tailwind, JavaScript, Node.js, Express, MongoDB

For the frontend, I used HTML, CSS, and Tailwind to create the UI of the app. For the backend, I used Node.js with the Express framework. I used MongoDB with Mongoose for my database. I also implemented Passport.js for user authentication. 

## Lessons Learned:

This was my biggest project yet. I had a lot of challenges with the backend and spent hours troubleshooting my code. When I first started with MongoDB, I only knew how to lay out all my data from the database into one page. This project required separate data for each lab. At first I had two separate database collections for lab data, but I learned how to keep it all in one database while still being able to grab specific entries and plug them into their corresponding pages. I also learned how to use Mongoose to simplify the process of making models for my database collections. I've never used a CSS framework before, but with this project I learned how to implement Tailwind CSS into my code.

When first learning to do backend, it really intimidated me. But after working on this project, I started to really enjoy working on backend code. My biggest takeaway from this project is that learning new technologies may feel overwhelming and confusing at first, but if you dive in and play with around with it enough, you'll start to see patterns and gradually figure out how everything works.

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
