const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

//? determines how much processing time it will take to perform the hash
const SALT_ROUNDS = 6;  // 6 is a reasonable value

const userSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        unique: true, // (validate) Mongoose creates a unique index in db which will trigger an error if violated
        trim: true, // (transform) Mongoose trims space before and after the string before saving
        lowercase: true, // (transform) Mongoose converts string to lowercase before saving
        required: true,
    },
    password: {
        type: String,
        trim: true,
        minLength: 3,
        required: true,
    },
}, {
    timestamps: true,
    //*toJSON is called when stringifying
    //*We want to exclude pw from that and instead hash it
    //? call function; pass through doc and ??
    toJSON: function (doc, ret) {
        delete ret.password;
        return ret;
    }
});

//*Pre Hook
userSchema.pre('save', async function (next) {
    //?this = userSchema
    //?so if pw is not modified, continue to next middleware
    if (!this.isModified('password')) return next();

    // update the password with the computed hash
    //*hash the pw
    //?update pw w/the computed hash
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS)
    return next();
})

module.exports = mongoose.model("User", userSchema);
