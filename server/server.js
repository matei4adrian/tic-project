// fake db
let db = [
  {
    id: 0,
    taskName: "do your bed",
    status: "notStartedYet",
  },
  {
    id: 190,
    taskName: "prepare for exam",
    status: "done",
  },
];

let users = [];

const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const serverSecret = "mnzbjkdjblosjbldjbio";

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //we expect JSON data to be sent as payloads
app.use(cors());

const logger = require("morgan"); //importing a HTTP logger

app.use(logger("dev")); //using the HTTP logger library

// middleware
function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, serverSecret, (err, decoded) => {
      if (err) {
        if (err.expiredAt) {
          console.log("tokenul tau a expirat");
          res.status(403);
          res.send("expiredToken");
        } else {
          console.log("tokenul tau nu este bun");
          res.status(403);
          res.send("brokenToken");
        }
      } else {
        console.log(decoded);
        req.email = decoded.data;
        next();
      }
    });

    next();
  } else {
    res.status(401);
  }
}

app.get("/", (req, res) => {
  res.status(200);
  res.send(db);
});

app.post("/register", (req, res) => {
  console.log("vrei sa faci POST cu ", req.body);

  let userToAdd = req.body;

  let response = {};

  if (
    users.find((user) => user.emailAddress === userToAdd.emailAddress) ===
    undefined
  ) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(userToAdd.password, salt, function (err, hash) {
        userToAdd.password = hash;
        users.push(userToAdd);
        console.log(users);
      });
    });
    // de revizuit
    response.success = true;
  } else {
    response.success = false;
    console.log("userul exista deja");
  }

  res.send(response);
});

app.post("/login", (req, res) => {
  let loginData = req.body;
  console.log("vrei sa te autentifici cu ", loginData);

  let response = {};
  response.success = false;

  const user = users.find(
    (user) => user.emailAddress === loginData.emailAddress
  );

  if (user === undefined) {
    response.user = false;
    console.log("utilizatorul nu exista");
  } else {
    bcrypt.compare(loginData.password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign(
          {
            data: user.emailAddress,
          },
          serverSecret,
          { expiresIn: "1h" }
        );

        console.log("tokenul tau este: ", token);
        res.send({ token });
      } else console.log("parola este gresita"); //de completat
    });
  }

  // res.send(response)
});

app.post("/tasks", verifyToken, (req, res) => {
  if (req.email === "mihai.gheorghe@gdm.ro") {
    console.log("vrei sa adaugi taskul cu detaliile ", req.body);
    res.send("am adaugat");
  } else {
    res.status(403);
    res.send("Incerci sa adaugi o resursa pentru alta adresa de email");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
