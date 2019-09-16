const mongoose = require("mongoose");
const User = mongoose.model("User");
const Game = mongoose.model("Game");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require("jsonwebtoken");
const secret = "ICryAlot";

module.exports = {

    create_user: function(req, res){
        var user = new User();
        user.username = req.body.username;
        user.email = req.body.email;

        var user_password = req.body.password
        
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
                        var token = jwt.sign({id:user._id}, secret, { expiresIn: '7d'})
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
                        console.log("Oh no there was an error")
                        // log error to cosnole for development
                        // send user id as false to instantiate error message on front end
                        console.log(err);
                        res.json({id:false});
                    // check if match returns as true or false
                    }
                    if(match){    
                        // if true will initiate session id
                        // send id as user id to log in user and allow access to app
                        var token = jwt.sign({id:user._id}, secret, { expiresIn: '7d'});
                        res.json({token: token}); 
                    }
                });
            };
        });
        
    },

    one_user: function(req, res){
        // Using both id and token to either find User or Seller information
        var token = req.params.token;
        var id = req.params.id
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
                    user.password = null;
                    res.json({user:user});
                }
            });
        }
    },

    updateUser: function(req, res){
        if(req.params.token){
            jwt.verify(req.params.token, secret, function(err, decoded){
                if(err){
                    console.log(err);
                    res.json({user:false});
                } else {
                    User.findById(decoded.id, function(err, user){
                        if(err || !user){
                            console.log(err);
                            res.json({user:false});
                        } else {
                            user.bio = req.body.bio;
                            user.phone = req.body.phone
                            user.system = req.body.system
                            user.save();
                            res.json({user:user});
                        }
                    });
                };
            });
        };
    },

   

    create_game: function(req, res){
        var token = req.params.token;
        if(token){
            jwt.verify(token, secret, function(err, decoded){
                if(err){
                    res.json({ game:false });
                } else {
                    var game = new Game(req.body);
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
        } else {
            res.redirect("/");
        }
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
        };
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
        var game_id = req.body.game_id;
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
        };
    }
};