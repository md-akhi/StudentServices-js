const express = require('express');
const path = require('path');
var reactViews = require('express-react-views');
var routeHome = require('./routes').index;
var routeLogin = require('./routes').login;
const app = express();
const port = 9000;


//set static dir
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactViews.createEngine());

app.get('/', routeHome);
app.get('/login', routeLogin);


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
