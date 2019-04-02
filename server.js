const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const app = express();

app.use(express.static(path.join(__dirname, './public/dist/public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

require("./server/config/mongoose.js")
require("./server/config/routes.js")(app);

app.listen(8000, () => {
    console.log("Listening on port 8000")
})