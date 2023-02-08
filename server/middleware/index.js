const { admin } = require("../config/firebase-admin");
class Middleware {
  async decodeToken(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      const decodeValue = await admin.auth().verifyIdToken(token);
      if (decodeValue) {
        console.log(decodeValue);
        return next();
      }
      return res.json({ message: "Unauthorized" });
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }
}
module.exports = new Middleware();
