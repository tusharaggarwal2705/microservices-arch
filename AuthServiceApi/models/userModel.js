const db = require('../connection/dbMaster');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const defSchema = require('../plugins/defSchemaAttr')

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            function (email) {
                let emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return emailRegex.test(email);
            },
            'The e-mail is invalid.'
        ],
        trim: true,
        lowercase: true,
        required: true,
        set: function (v) {
            return `${v}`.toLowerCase()
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: [
            function (password) {
                let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
                return passwordRegex.test(password);
            },
            'Password should be alphanumeric.'
        ]
    },
    phoneNumber: {
        type: Number,
        unique: true,
        required: true
    },

    salt: {
        type: String,
        default: "",
    }
});

UserSchema.pre('save', function (callback) {
    this.salt = bcrypt.genSaltSync(20);
    this.password = bcrypt.hashSync(this.password, 10);
    callback();
});

UserSchema.methods.verifyPassword = async function (password) {
    try {
        let result=await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        throw {error}
    }
};

UserSchema.pre("findOneAndUpdate", function (callback) {
    let updateObj = this._update.$set
    if (updateObj && updateObj.password) {
        updateObj.salt = bcrypt.genSaltSync(20),
            updateObj.password = bcrypt.hashSync(updateObj.password, 10)
    }
    callback();
});

UserSchema.plugin(defSchema);

module.exports = db.model('User', UserSchema);
