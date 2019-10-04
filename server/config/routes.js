const controller = require("../controllers/controller.js");
const path = require("path");
const multer = require('multer');


const storage = multer.diskStorage({
    destination: './uploads/userImages',
    filename: function(req, file, cb){
        cb(null, file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage
}).single('profile');

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

    app.get("/user/messages/:token", (req, res) => {
        controller.getMessages(req, res);
    })

    app.post("/login", (req, res) => {
        controller.logInUser(req, res);
    });

    app.post("/user", (req, res) => {
        controller.create_user(req, res);
    });

    app.post("/games/:token", (req, res) => {
        controller.create_game(req, res);
    });

    app.post("/user/messages/:token", (req, res) => {
        controller.createMessage(req, res);
    })

    app.put("/user/:token", (req, res) => {
        upload(req, res, (err) => {
            if (err) {
                console.log(err);
            }
            controller.updateUser(req, res);
        })
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