const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // 1. Get the token from the "Authorization" header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer <token>"

  if (!token) return res.status(403).json({ error: "Access denied" });

  try {
    // 2. Verify the token using your secret key
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Add user data to the request object
    next(); // Move to the next function (the controller)
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = { verifyToken };
