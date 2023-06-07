const jwt = require("jsonwebtoken");
const _ = require("lodash");

const verifyToken = (req, res, next) => {
  try {
    const bearerToken = _.pick(req.header, ["Authorization"]);

    if (bearerToken) {
      const token = bearerToken.Authorization.split(" ")[1];
      const result = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      if (result) {
        return next();
      }
      return res.status(403).json({ error: "Access denied" });
    }
    return res.status(403).json({ error: "Access denied" });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

module.exports = verifyToken