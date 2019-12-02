const controller = require("../controllers/controller.js"),
        path = require("path"),
        aws = require('aws-sdk'),
        multer = require('multer'),
        multerS3 = require('multer-s3'),
        s3 = new aws.S3({});
    
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_REGION
})
 
 const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'game-cellar-bucket',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

const singleUpload = upload.single('image')

module.exports = (app) => {

    app.get("/user/:token", (req, res) =>  {
        controller.one_user(req, res);
    });

    app.get("/seller/:id", (req, res) => {
        controller.one_user(req, res);
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
    });

    app.put("/user/:token", (req, res) => {
        singleUpload(req, res, (err) => {
            if (err) {
                console.log(err);
            }
            controller.updateUser(req, res);
        })
    })

    app.put("/user/:token/wish", (req, res) => {
        controller.addGameToWishList(req, res);
    })

    app.delete("/games/:token/:game_id", (req, res) => {
        controller.deleteGame(req, res);
    });

    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./public/dist/public/index.html"));
    });
};