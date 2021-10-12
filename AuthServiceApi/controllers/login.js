const { getUser } = require("../dbServices/users");
const { getJWTToken } = require('../services/jwt');
const { validateLoginInput } = require('../validators/login');
const { httpStatusCodes } = require('../config/config');
const { handleResponse, handleError } = require("../utils/requestHandler");

exports.login = async ({ body: { email, password, subject } }, res) => {
    try {
        const { errors, isValid } = validateLoginInput({ email, password });

        if (!isValid) {
            if (errors.email) throw errors.email;
            else {
                throw { error: errors.password, statusCode: httpStatusCodes.UNAUTHORIZED };
            }
        }

        let user = await getUser("email", email);

        if (!user) throw { error: 'User does not exist', statusCode: httpStatusCodes.UNAUTHORIZED };
        if (!user.verifyPassword(password)) throw { error: 'Password is incorrect', statusCode: httpStatusCodes.FORBIDDEN };

        let accessToken = await getJWTToken({ userId: user._id, email, subject, salt: user.salt });

        user._doc.accessToken = accessToken;
        user.password = null;

        handleResponse({ res, data: user });

    } catch ({ error, statusCode }) {
        handleError({ err: error, statusCode, res });
    }
}