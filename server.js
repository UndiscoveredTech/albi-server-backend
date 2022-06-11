const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const bodyParser = require('body-parser');

const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(bodyParser.json());

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

//import routes
const companyRoute = require("./app/routes/company.routes");
app.use('/company', companyRoute);

const userRoute = require("./app/routes/user.routes");
app.use('/user', userRoute);

const employeeRoute = require("./app/routes/employee.routes");
app.use('/employee', employeeRoute);


const monthlyRoutes = require("./app/routes/monthly.routes");
app.use('/employee', monthlyRoutes);


const staticMonthRoutes = require("./app/routes/staticmonth.routes");
app.use('/staticmonth', staticMonthRoutes);

const settings = require("./app/routes/settings.routes");
app.use('/settings', settings);


const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb+srv://root:12345elb@payroll.rmzxx.mongodb.net/payroll_db?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require("./app/routes/auth.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}