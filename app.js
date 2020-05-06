const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const listRouter = require('./routes/list.js');
const taskRouter = require('./routes/task.js');



const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(listRouter);
app.use(taskRouter);





const https = require('https');
const fs = require('fs');
const httpsLocalhost = require("https-localhost")()
var privateKey  = fs.readFileSync('server.key');
var certificate = fs.readFileSync('server.cert');
var credentials = {key: privateKey, cert: certificate};

const port = 3000;

httpsLocalhost.getCerts().then(certs => {
    https.createServer(credentials, app).listen(port, function(){
        console.log("Server running at https://localhost:" + port)
    })
})
// app.listen(3000, function() {
//   console.log("Server started on port 3000");
// });
