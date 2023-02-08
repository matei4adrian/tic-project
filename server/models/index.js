const { db } = require("../config/firebase-admin");

const Companies = db.collection("Companies");
const Users = db.collection("Users");

module.exports = {
  Companies,
  Users,
};
