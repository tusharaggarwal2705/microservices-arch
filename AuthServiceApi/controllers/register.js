const { httpStatusCodes } = require("../config/prod");
const { getUser, saveUser } = require("../dbServices/users");
const { getJwtToken } = require("../services/jwt");
const { handleError, handleResponse } = require("../utils/requestHandler");
const { validateRegisterInput } = require('../validators/register');

exports.register = async ({ body: { firstName, lastName, email, password, phoneNumber, subject } }, res) => {
    try {
        let { errors, isValid } = validateRegisterInput({ firstName, lastName, email, password, phoneNumber });

        if (!isValid) {
            if (errors.email) throw { error: errors.email, statusCode: httpStatusCodes.UNAUTHORIZED };
            else if (errors.password) throw { error: errors.password, statusCode: httpStatusCodes.UNAUTHORIZED };
            else if (errors.firstName) throw { error: errors.firstName, statusCode: httpStatusCodes.BAD_REQUEST };
            else if (errors.lastName) throw { error: errors.lastName, statusCode: httpStatusCodes.BAD_REQUEST };
            else if (errors.phoneNumber) throw { error: errors.phoneNumber, statusCode: httpStatusCodes.BAD_REQUEST };
            return res.send(httpStatusCodes.BAD_REQUEST).send(errors);
        }

        if (await getUser(email, "email")) throw { error: "User already exists with given email", statusCode: httpStatusCodes.ALREADY_EXISTS };
        if (await getUser(phoneNumber, "phoneNumber")) throw { error: "User already exists with given phone number", statusCode: httpStatusCodes.ALREADY_EXISTS };

        let user = await saveUser({ firstName, lastName, email, password, phoneNumber });

        let accessToken = await getJwtToken(user._id, email, subject, user.salt);

        user._doc.accessToken = accessToken;
        user.password = null;
        user.salt = null;

        handleResponse({ res, data: user, msg: 'User registered successfully' });

    } catch ({ error, statusCode }) {
        handleError({ err: error, statusCode, res });
    }
}