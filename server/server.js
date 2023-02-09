const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const Chance = require("chance");
const router = require("./routes");
const { db } = require("./config/firebase-admin");
const firebase = require("firebase/app");

var chance = new Chance();

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

app.get("/reset", async (req, res) => {
  db.collection("Companies")
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs.forEach((snapshot) => {
        console.log(snapshot.id);
        db.collection("Companies").doc(snapshot.id).delete();
      });
      for (let i = 0; i < 2; i++) {
        db.collection("Companies")
          .add({
            name: chance.company(),
            address: chance.address(),
            phoneContact: chance.phone({
              country: "fr",
              mobile: true,
              formatted: false,
            }),
          })
          .then((ref) => {
            for (let j = 0; j < 2; j++) {
              const products = chance.pickone([
                "Telefon Apple iPhone 13 Pro 256 GB",
                "Cablu 20m",
                "Echipament retelistica",
              ]);
              db.collection("Companies")
                .doc(ref.id)
                .collection("Orders")
                .add({
                  customerName: chance.name(),
                  address: chance.address(),
                  phoneContact: chance.phone({
                    country: "fr",
                    mobile: true,
                    formatted: false,
                  }),
                  products: products,
                });
            }
          })
          .catch((err) => {
            return res.status(500).json({ message: err.message });
          });
      }

      return res
        .status(200)
        .json({ message: "Data was reseted successfully!" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: err.message });
    });
});

app.get("/", (req, res) => {
  res.status(200);
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
