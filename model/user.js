// Third party imports
const { Schema, model } = require("mongoose");
const uuidv1 = require('uuid/v1');
// Node imports
const crypto = require('crypto');
/**
 * This is the user schema! Not much to worry about regarding name, email and created. But the hashed
 * password is interesting. The user enters their password in a 'virtual' field, which then takes that 
 * input and hashes it with a randomly generated salt. The result is then stored in the 'hashed_password'
 * field.  
 */
const userSchema = new Schema({
    name: {
        type: String,
        required: "Name is required",
        minlength: 2,
        maxlength: 100
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    hashed_password: {
        type: String,
        required: true,
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
})

userSchema.virtual('password')
    .set(function(password) {
        // create temporary variable _password
        this._password = password;
        // generate a salt
        this.salt = uuidv1();
        // encrypt the password using the method encryptPassword which belongs to the user schema
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    })

//#region methods
userSchema.methods = {
    /**
     * encrypts the password with a string argument of password. If there's no password, it returns 
     * null. otherwise, it tries to createHmac() with the this.salt generated earlier above. 
     * After that, it updates the password.
     */
    encryptPassword: function(password) {
        if (!password) return "";
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        }
        catch (err) {
            return "Password could not be encrypted!";
        }
    }
}
//#endregion

module.exports = model("User", userSchema);