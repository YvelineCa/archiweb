let express    = require('express');        // call express
let app        = express();                 // define our app using express

// Configure bodyparser to handle POST requests
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine','ejs');
// Import routes
let router = require('./routes');
app.use('/', router);

// Launch app to listen to specified port
var port = 8000
app.listen(port, function () { console.log('Running server on port ' + port); })
