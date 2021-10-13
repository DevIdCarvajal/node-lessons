// -------- Imports & Config --------

const express = require('express')
const cookieParser = require('cookie-parser')
const path = require("path");
const helmet = require("helmet");

const app = express()
const PORT = process.env.PORT || 4000;

// -------- Middlewares --------

app.use(cookieParser());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "..", "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// -------- Endpoints --------

// -- Auth examples

    app.get("/", (req, res) => {
        // check if user is logged in, by checking cookie
        let username = req.cookies.username;
    
        // render the home page
        return res.render("home", { username });
    });

    app.get("/welcome", (req, res) => {
        // get the username
        let username = req.cookies.username;

        if(username) {
            // render welcome page
            return res.render("welcome", { username });
        } else {
            // redirect with a fail msg
            return res.redirect("/login?msg=fail");
        }
    });

    app.get("/login", (req, res) => {
        // check if there is a msg query
        let bad_auth = req.query.msg ? true : false;

        // if there exists, send the error.
        if (bad_auth) {
            return res.render("login", {
                error: "Invalid username or password",
            });
        } else {
            // else just render the login
            return res.render("login");
        }
    });

    app.post("/processLogin", (req, res) => {
        // get the data
        let { username, password } = req.body;
      
        // fake test data
        let userdetails = {
          username: "Bob",
          password: "123456",
        };
      
        // basic check
        if (
          username === userdetails["username"] &&
          password === userdetails["password"]
        ) {
          // saving the data to the cookies
          res.cookie("username", username);
          // redirect
          return res.redirect("/welcome");
        } else {
          // redirect with a fail msg
          return res.redirect("/login?msg=fail");
        }
    });

    app.get("/logout", (req, res) => {
        // clear the cookie
        res.clearCookie("username");
        // redirect to login
        return res.redirect("/login");
    });

// -- Cookies examples

    //a get route for adding a cookie
    app.get('/setcookie', (req, res) => {
        res.cookie('auth-jwt', 'jugh7854g7hgw7gh7gtjw80hh6h6');

        res.send('Cookie have been saved successfully');
    });

    // get the cookie incoming request
    app.get('/getcookie', (req, res) => {
        //show the saved cookies
        console.log(req.cookies)
        res.send(req.cookies);
    });

    // delete the saved cookie
    app.get('/deletecookie', (req, res) => {
        //show the saved cookies
        res.clearCookie('io')
        res.send('Cookie has been deleted successfully');
    });

//server listening
app.listen(PORT, () => console.log(`The server is running port ${PORT}...`));