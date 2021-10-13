const { getUser } = require("../dbServices/users");
const { getJwtToken } = require('../services/jwt');
const { validateLoginInput } = require('../validators/login');
const { httpStatusCodes } = require('../config/config');
const { handleResponse, handleError } = require("../utils/requestHandler");

exports.login = async ({ body: { email, password, subject } }, res) => {
    try {
        const { errors, isValid } = validateLoginInput({ email, password });

        if (!isValid) {
            if (errors.email) throw { error: errors.email, statusCode: httpStatusCodes.UNAUTHORIZED };
            else {
                throw { error: errors.password, statusCode: httpStatusCodes.UNAUTHORIZED };
            }
        }

        let user = await getUser(email, "email");

        if (!user) throw { error: 'User does not exist', statusCode: httpStatusCodes.UNAUTHORIZED };

        if (!(await user.verifyPassword(password))) throw { error: 'Password is incorrect', statusCode: httpStatusCodes.FORBIDDEN };

        let accessToken = await getJwtToken(user._id, email, subject, user.salt);

        user._doc.accessToken = accessToken;
        user.password = null;
        user.salt = null;

        handleResponse({ res, data: user });

    } catch ({ error, statusCode }) {
        handleError({ err: error, statusCode, res });
    }
}