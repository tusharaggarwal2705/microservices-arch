const User = require('../models/userModel');

exports.getUser = async (fieldValue, fieldName = "_id") => {
    try {
        return result = await User.findOne({ [fieldName]: fieldValue, isDeleted: false });
    } catch (error) {
        throw {error};
    }
}

exports.saveUser = async(data) => {
    try {
        return new User(data).save();
    } catch (error) {
        throw {error};
    }   
}