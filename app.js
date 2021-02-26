require("dotenv").config();
let express = require("express");
const app = express();
const sequelize = require("./db");



var cors = require("cors");


let favorites = require("./controllers/favoritescontroller");
let user = require("./controllers/usercontroller");

sequelize.sync(); //method to ensure all models (tables) are actually put onto the db if they're not there
//sequelize.sync({force: true})

// app.use('/test', function(req, res){
//     res.send('This is a message from the test endpoint on the modPod server.')
// });

app.use(express.json());



app.use(cors());


//Exposed Route
app.use("/user", user);
//Protected Route
app.use(require("./middleware/validate-session"));
app.use("/favorites", favorites);

//need to always put code in-between the listen and the variable above
app.listen(3000, function () {
  console.log("App is listening on port 3000");
});
