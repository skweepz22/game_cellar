const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    username: {type:String, required:true, unique:true},
    email: {type:String, required:[true, "Email is required"], validate:{validator: (email) => {
        return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$/.test(email);
    }}, message: "Email must be in valid format", unique:true},
    password:{type:String, required:[true, "Password is required"], minlength:[10, "Password must have a minimum of 10 characters"]},
    phone:{type:String, required:false},
    games:[{type:Schema.Types.ObjectId, ref:"Game"}],
    bio:{type:String, required:false},
    system:{type:String, required:false},
    wishlist:[{type:Schema.Types.ObjectId, ref:"Game"}],
    profile: {type: Array, required: false}
}, {timestamps:true});

const GameSchema = mongoose.Schema({
    name:{type:String, required:[true, "Name is required for Game"]},
    console:{type:String, required:[true, "Console is required for Game"]},
    condition:{type:String, required:[true, "Condition is required for Game"]},
    price:{type:Number, required:[true, "Price is required for Game"]},
    year:{type:Number, required:[true, "Please provide the year realse of the game"]},
    pictures:{type:Array, required:false},
    _user: {type: Schema.Types.ObjectId, ref:"User"}
}, {timestamps:true});

mongoose.model("User", UserSchema);
mongoose.model("Game", GameSchema);