const mongoose = require("mongoose");
const path = require('path');
const User = mongoose.model("User");
const Game = mongoose.model("Game");
const Message = mongoose.model("Message");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");
const secret = "ICryAlot";

module.exports = {

    create_user: function(req, res){
        let user = new User();
        user.username = req.body.username;
        user.email = req.body.email;

        let user_password = req.body.password
        
        bcrypt.hash(user_password, saltRounds, (err, hashed) => {
            if(err){
                console.log(err.json());
                return err.json()
            } else {
                user.password = hashed;
                user.save(function(err, user){
                    if(err){
                        console.log(err);
                        res.json(err);
                    } else {
                        let token = jwt.sign({seller_id:user._id}, secret, { expiresIn: '1d'})
                        res.json({token:token});
                    }
                });
            };
        });
    },
    
    logInUser: function(req, res){
        User.findOne({username:req.body.username}, function(err, user){
            // check for error or empty user return 
            if(err || !user){
                // log error to cosnole for development
                // send user id as false to instantiate error message on front end
                console.log(err);
                res.json({id:false});
            } else { 
                // comapre the password entered with the previously hashed password savedin db
                bcrypt.compare(req.body.password, user.password, function(err, match){
                    if(err){
                        // log error to cosnole for development
                        // send user id as false to instantiate error message on front end
                        console.log(err);
                        res.json({
                            message: "There was an error",
                            token:false
                        });
                    // check if match returns as true or false
                    }
                    // if match is false return error message and id as false
                    if(!match) {
                        res.json({
                            message: "User was not found",
                            token: false
                        })
                    }
                    if(match){ 
                        // if true will initiate session id
                        // send id as user id to log in user and allow access to app
                        let token = jwt.sign({id:user._id}, secret, { expiresIn: '7d'});
                        res.json({token: token}); 
                    }
                });
            };
        });
        
    },

    one_user: function(req, res){
        // Using both id and token to either find User or Seller information
        let token = req.params.token;
        let id = req.params.id
        if(token){
            //if token is provided we are searching for user
            //verify token before query
            jwt.verify(token, secret, function(err, decoded){
                if(err){
                    res.json({ user:false });
                } else {
                    // use decoded id to find user and populate games
                    User.findById(decoded.id).populate("games").populate("wishlist").exec(function(err, user){
                        if(err || !user){
                            res.json({ user:false })
                        } else {
                            user.password = null;
                            res.json({ user:user });
                        };
                    });
                };
            });
        }else if(id){
            //if id is provided then we are searching for seller
            //use id to find seller and populate games
            User.findById(id).populate("games").populate("wishlist").exec(function(err, user){
                if(err || !user){
                    res.json({user:false});
                } else {
                    let token = jwt.sign({id:user._id}, secret, { expiresIn: '1h'});
                    user.password = null;
                    res.json({
                        user: user,
                        token: token
                    });
                }
            });
        } else res.json({err: "no token or id provided"});
    },

    updateUser: function(req, res){
        if(req.params.token){
            jwt.verify(req.params.token, secret, function(err, decoded){
                if(err){
                    console.log(err);
                    res.json({user:false});
                } else {
                    User.findById(id).populate("games").populate("wishlist").exec(function(err, user){
                        if(err || !user){
                            console.log(err);
                            res.json({user:false});
                        } else {
                            if (req.file) {
                                let filepath = path.join(__dirname, '../../uploads/userImages') + '/' + req.file.filename;
                                user.bio = req.body.bio;
                                user.phone = req.body.phone;
                                user.system = req.body.system;
                                user.profile.push(filepath)
                                user.save();
                                res.sendFile(filepath)
                                res.json({user:user});
                            } else {
                                user.bio = req.body.bio;
                                user.phone = req.body.phone;
                                user.system = req.body.system;
                                user.save();
                                res.json({user:user});
                            }
                            
                        }
                    });
                };
            });
        } else res.json({err: "no token provided"});
    },

   

    create_game: function(req, res){
        let token = req.params.token;
        if(token){
            jwt.verify(token, secret, function(err, decoded){
                if(err){
                    res.json({ game:false });
                } else {
                    let game = new Game(req.body);
                    game._user = decoded.id;
                    game.save(function(err, game){
                        if(err){
                            console.log(err);
                            res.json({game:false});
                        } else {
                            User.findByIdAndUpdate(decoded.id, {$push: {games: game}}, function(err, user){
                                if(err){
                                    console.log(err)
                                    res.json({game:false})
                                } else {
                                    res.json({game:true});
                                }
                            })
                        }
                    })
                };
            });
        } else res.json({err: "no token provided"});
    },

    deleteGame: (req, res) => {
        const token = req. params.token
        const game_id = req.params.game_id 
        if(req.params.token){
            jwt.verify(token, secret, (err, decoded) => {
                if(err){
                    res.json({delete:false});
                } else {
                    Game.findByIdAndRemove(game_id, (err, game) => {
                        User.findByIdAndUpdate(decoded.id, { $pull: { games: { $in: game_id }}}, (err, user) => {
                            if(err){
                                res.josn({delete: false});
                            } else {
                                res.json({delete: true});
                            }
                        });
                    });
                };
            });
        } else res.json({err: "no token provided"});
    },

    all_games(req, res){
        Game.find({}, function(err, games){
            if(err || !games){
                res.json({games:false})
            } else {
                res.json({games:games});
            };
        });
    },
    
    addGameToWishList: (req, res) => {
        let game_id = req.body.game_id;
        if(req.params.token){
            jwt.verify(req.params.token, secret, (err, decoded) => {
                if(err){
                    console.log(err);
                    res.json({user:false})
                } else {
                    Game.findById(game_id, (err, game) => {
                        if(err){
                            console.log(err);
                            res.json({user:false})
                        } else {
                            User.findByIdAndUpdate(decoded.id, { $addToSet: { wishlist: game } }, (err, user) => {
                                if(err){
                                    console.log(err);
                                    res.json({err: err})
                                } else {
                                    res.json({user: user})
                                }
                            });
                        };
                    });
                };
            });
        } else res.json({err: "no token provided"});
    },

    createMessage: (req, res) => {
        if(!req.body) res.json({err: "Please enter message data"})
        let token = req.params.token;
        jwt.verify(token, secret, (err, decoded) => {
            if(err) {
                console.log(err) 
                res.json({err: err})
            } else {
               Game.find({name: req.body.game}, (err, game) => {
                   if(err) {
                       console.log(err);
                       res.send({err: err});
                   } else {
                       let message = new Message();
                       message.to = req.body.to;
                       message.from = decoded.id;
                       message._game = game[0]._id;
                       message.body = req.body.body
                       message.save((err, message) => {
                           if(err) {
                               console.log(err);
                               res.json({err:err})
                           } else {
                               Message.findById(message._id).populate("to").populate("from").exec((err, message) => {
                                   if(err){
                                       console.log(err);
                                       res.json({err:err});
                                   } else {
                                       res.json({message:message})
                                   }
                               })
                           }
                       })
                   }
               })
            }
        })
    },

    getMessages: (req, res) => {
        Message.find({}, (err, messages) => {
            if(err) res.json({err: err})
            res.json({messages: messages})
        })
    }
};