const controller = require("../controllers/controller.js");
const path = require("path");

module.exports = function(app){

    app.get("/user/:token", function(req, res){
        controller.one_user(req, res);
    });

    app.get("/seller/:id", function(req, res){
        controller.one_user(req, res);
    })

    app.get("/game", function(req, res){
        controller.one_game(req, res);
    });

    app.get("/games", function(req, res){
        controller.all_games(req, res);
    });

    app.post("/login", function(req, res){
        controller.logInUser(req, res);
    });

    app.post("/user", function(req, res){
        controller.create_user(req, res);
    });

    app.post("/games/:token", function(req, res){
        controller.create_game(req, res);
    });

    app.put("/user/:token", function(req, res){
        controller.updateUser(req, res);
    })

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"));
    });
};