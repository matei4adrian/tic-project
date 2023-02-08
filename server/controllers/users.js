const {
  getAuth: getClientAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} = require("firebase/auth");
const UsersDB = require("../models").Users;

const controller = {
  register: async (req, res) => {
    const { name, email, password, phone } = req.body;
    const auth = getClientAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        UsersDB.doc()
          .set({
            name: name,
            email: email,
            phoneno: phone,
          })
          .then(() => {
            res.status(200).send("User created successfully");
          });
      })
      .catch((err) => {
        res.send(err);
      });
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const auth = getClientAuth();
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          UsersDB.where("email", "==", email)
            .get()
            .then((users) => {
              let value = users.docs[0].data();
              auth.currentUser
                .getIdToken(true)
                .then((idToken) => {
                  res.json({
                    ...value,
                    idToken,
                  });
                })
                .catch(function (err) {
                  return res.status(400).send({ message: err.message });
                });
            });
        }
      );
    } catch (err) {
      return res.status(400).send({ message: err.message });
    }
  },
  logout: async (req, res) => {
    const auth = getClientAuth();
    signOut(auth)
      .then(() => {
        res.status(200).send("User sign-out successfully");
      })
      .catch((err) => {
        return res.status(400).send({ message: err.message });
      });
  },
  getCurrentUser: async (req, res) => {
    const auth = getClientAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(200).send("User is not logged in!");
      }
    });
  },
};

module.exports = controller;
