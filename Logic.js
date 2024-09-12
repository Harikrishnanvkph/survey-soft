const router = require('express').Router();
const { genToken, auth } = require("./giver.js");
const {createUser,getCreatedSurveys,createSurvey,addAttendedSurvey,
getAttendedSurveys} = require("./database.js");

router.get('/', (req, res) => {
       res.send('Hello from Mobile Express Server!');
     });
     
router.post('/login', async (req, res) => {
  const { usermail, userpassword } = req.body;
  
  // Validate user credentials (add your authentication logic here)
  console.log(req body)
  const user = { mail: usermail }; // Payload for the token
  const token = await genToken(user); // Generate JWT
  const createUsers = await createUser(usermail);
  res.json({ token }); 
});

router.post("/showCreatedSurveys", auth, async (req, res) => {
  const surverysCreated = await getCreatedSurveys(req.user.mail);
  res.send(surverysCreated);
});

router.post("/showAttendedSurveys", auth, async (req, res) => {
  const surveysAttended = await getAttendedSurveys(req.user.mail);
  res.send(surveysAttended);
});

router.post("/createSurvey", auth, async (req, res) => {
const { usermail, data } = req.body;
  const createSurvey = await createSurvey(req.user.mail, data);
  res.send(surverysAttended);
});

router.post("/addAttendedSurvey", auth, async (req, res) => {
  const { usermail, data, survey_no} = req.body;
  const addAttendedSurvey = await addAttendedSurvey(req.user.mail, data, survey_no);
  res.send(surverysAttended);
});

module.exports = router;