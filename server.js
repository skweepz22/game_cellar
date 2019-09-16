const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const app = express();

app.use(express.static(path.join(__dirname, './public/dist/public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

require("./server/config/mongoose.js")
require("./server/config/routes.js")(app);

const PORT = process.env.PORT || 8888

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`)
})