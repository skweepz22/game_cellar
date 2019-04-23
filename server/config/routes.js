const controller = require("../controllers/controller.js");
const path = require("path");

module.exports = (app) => {

    app.get("/user/:token", (req, res) =>  {
        controller.one_user(req, res);
    });

    app.get("/seller/:id", (req, res) => {
        controller.one_user(req, res);
    })

    app.get("/game", (req, res) => {
        controller.one_game(req, res);
    });

    app.get("/games", (req, res) => {
        controller.all_games(req, res);
    });

    app.post("/login", (req, res) => {
        controller.logInUser(req, res);
    });

    app.post("/user", (req, res) => {
        controller.create_user(req, res);
    });

    app.post("/games/:token", (req, res) => {
        controller.create_game(req, res);
    });

    app.put("/user/:token", (req, res) => {
        controller.updateUser(req, res);
    })

    app.delete("/games/:token/:game_id", (req, res) => {
        controller.deleteGame(req, res);
    });

    app.put("/user/:token/wish", (req, res) => {
        controller.addGameToWishList(req, res);
    })

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"));
    });
};