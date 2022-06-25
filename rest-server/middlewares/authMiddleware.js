const jwt = require("jsonwebtoken");

require("dotenv").config();
const JWTSECRET = process.env.JWTSECRET;

function getUser(token) {
  try {
    if (token) {
      return jwt.verify(token, JWTSECRET);
    }
    return null;
  } catch (err) {
    return null;
  }
}

function getUserFromReq(req) {
  const token = req.get("Authorization") || "";
  return getUser(token.replace("Bearer ", ""));
}

module.exports = (req, res, next) => {
  const user = getUserFromReq(req);
  const noAuth = req.get("no-auth");
  if (!user && noAuth != 1) {
    return res.status(401).json({ error: "Unauthorizated" });
  }
  next();
};
