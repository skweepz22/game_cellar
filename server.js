const express = require('express'),
    path = require('path'),
    app = express();

require('dotenv').config()

app.use(express.static(path.join(__dirname, './public/dist/public')));
app.use(express.json())

require("./server/config/mongoose.js")
require("./server/config/routes.js")(app);

const PORT = process.env.PORT || 8888

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
})