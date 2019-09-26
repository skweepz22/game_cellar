const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

mongoose.connect('mongodb+srv://felipe_santana:burnafat1@gamecellar-uqobm.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: false });

var models_path = path.join(__dirname, '../models');

fs.readdirSync(models_path).forEach(function(file){
    if(file.indexOf('.js')>=0){
        require(models_path+'/'+file);
    };
});