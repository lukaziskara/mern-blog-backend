import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  // console.log(token)
  if (token) {
    try {
      const decoded = jwt.verify(token, "secret123");
      req.userId = decoded._id;
      // console.log("decoded",decoded, req.userId)
      next();
    } catch (err) {
      // console.log(err)
      res.status(403).json({
        message: "no access",
      });
    }
  } else {
    res.status(403).json({
      message: "no access",
    });
  }
};
