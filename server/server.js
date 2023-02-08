const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const router = require("./routes");
const middleware = require("./middleware/index");
const firebase = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyCskQ9JkKBkyRiQOGv46UNBfHsrnNbpGe0",
  authDomain: "proiecttic2023.firebaseapp.com",
  projectId: "proiecttic2023",
  storageBucket: "proiecttic2023.appspot.com",
  messagingSenderId: "923189785561",
  appId: "1:923189785561:web:011a5e843f6fc2b8395fc8",
};

firebase.initializeApp(firebaseConfig);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const logger = require("morgan");

app.use(logger("dev"));

app.use("/api", router);

app.get("/", (req, res) => {
  res.status(200);
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
