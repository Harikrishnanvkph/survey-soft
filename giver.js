const jwt = require('jsonwebtoken');

// Function to generate JWT token
async function genToken(user) {
  const token = await jwt.sign(user, process.env.SECRET_KEY); // Set token expiration if needed
  console.log(token)
  return token;
}

// Middleware to authenticate the token
async function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).send("Invalid or expired token"); // Forbidden
    }
    req.user = user; // Attach decoded user to req object
    next(); // Continue to the next middleware or route
  });
}

module.exports = { genToken, auth };