//* Request handler Logic

//!make sure you are importing the model, so capital U
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//* /*-- Helper Functions --*/

function createJWT(user) {
    return jwt.sign(
        //data payload
        { user },
        process.env.SECRET,
        //if you do not include the "h" in "24h", your token will be rejected 
        { expiresIn: '24h' });
}

async function create(req, res) {
    // console.log('[From POST handler]', req.body)

    /**
     * this is dummy data that we deleted when we started to link everything via async function
    res.json({
        user: {
            name: req.body.name,
            email: req.body.email
        }
    })
    */

    try {
        //*create new user
        const user = await User.create(req.body);
        //!checkpoint
        console.log(user);

        //*create new JWT
        const token = createJWT(user); //this token will be a string

        res.json(token); //the token that gets return can be decoded via jwt.oi

    } catch (error) {
        console.log(error);

        //*set error code (see https cats lol)
        res.status(400).json(error)
    }
}


async function login(req, res) {
    try {
        // find user in db by email
        const user = await User.findOne({ email: req.body.email });
        // console.log('[USER FOUND]', user)

        // check if we found an user
        //?if user exists
        if (!user) throw new Error();
        //?compare the password to hashed password
        const match = await bcrypt.compare(req.body.password, user.password);
        //?if password matches
        if (!match) throw new Error();
        //?send back a new token with the user data in the payload
        res.json(createJWT(user));
    } catch {
        res.status(400).json('Bad Credentials');
    }
}


async function checkToken(req, res) {
    console.log(req.user);
    res.json(req.exp)
}

//!don't forget to export functions since we're not exporting above
module.exports = {
    create,
    login,
    checkToken
}