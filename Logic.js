const router = require('express').Router();
const { genToken, auth } = require("./giver.js");

router.post('/login', async (req, res) => {
  const { usermail, userpassword } = req.body;
  
  // Validate user credentials (add your authentication logic here)
  
  const user = { mail: usermail }; // Payload for the token
  const token = await genToken(user); // Generate JWT
  res.json({ token }); 
});

router.post("/showSurveys", auth, async (req, res) => {
  // Your survey logic here
  res.send(`Surveys for user: ${req.user.mail}`);
});

module.exports = router;