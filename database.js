const client = require('./server.js');

const dbClient = client.db("Survey"). collection("Users");

//create User
async function createUser(mail, password){
    const ce = await dbClient.insertOne({
mail : mail,
survey : {
created : [],
attended : []}
});
    return ce;
}

// add to surveys list
async function addSurvey(mail,data){
    const ce = await client.db("Survey"). collection("AllSurveys").insertOne({
    	owner : mail,
        survey_object : data
});
    return ce;
}

// get New Survey No
async function getId(){
    const gt =  await client.db("Survey").collection("TrackIDs").findOne({},{survey_no : 1, _id : 0});
    return gt.id;
}

//set new ID
async function setId(user_id){
    await client.db("Survey").collection("TrackIDs").updateOne({},{
        $set : {
            survey_no : user_id + 1
        }
    })
}

//show created Surveys
async function getCreatedSurveys(mail){
    const ce = await dbClient.findOne({mail : mail},{"survey.created" : 1,_id : 0});
    return ce;
}

//create Survey
async function createSurvey(mail, data) {
  const surveyNo = await getId();
  const sur = {
    survey_no: surveyNo,
    survey_data: data,
  };

  // Add to the user's created surveys list
  await dbClient.updateOne(
    { mail: mail },
    { $push: { "survey.created": sur } }
  );

  // Add to the collection of all surveys
  await addSurvey(mail, sur);

  // Update the survey ID tracker
  await setId(surveyNo);

  return sur;
}


//add attended Survey
async function addAttendedSurvey(mail,data,surveyNo){
	const getSur = await getSurveyNo(surveyNo);
	if(getSur == null){
		return "Invalid Survey No"
		}
		const sur = {
		survey_no : surveyNo,
        survey_data : data
     }
    const ce = await dbClient.updateOne({mail : mail}
    	{ $push: { "survey.attended":  sur} });
    return ce;
}

//show attended Surveys
async function getAttendedSurveys(mail){
    const ce = await dbClient.findOne({mail : mail},{"survey.attended" : 1,_id : 0});
    return ce;
}


// search for a survey no
async function getSurveyNo(survey_no){
    const ce = await client.db("Survey"). collection("AllSurveys").findOne({
    	survey_no : survey_no
});
    return ce;
}




module.exports = {createUser,getCreatedSurveys,createSurvey,addAttendedSurvey,
getAttendedSurveys,addSurvey}

