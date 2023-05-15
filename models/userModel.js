const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
      },
    product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product',
    }

},
{
    timestamps: true
});

userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = User;