const User = require('../models/userModel');

exports.getUser = async (fieldName, fieldValue) => {
    try {
        return result = await User.findOne({ [fieldName]: fieldValue }).lean(true);
    } catch (error) {
        throw error;
    }
}