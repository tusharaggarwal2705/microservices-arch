const { getUser } = require("../dbServices/users");
const { getJWTToken }=require('../services/jwt');

exports.login = async ({ body: { email, password, subject } }, res) => {
    try {
        const { errors, isValid } = loginValidator({ email, password });

        if (!isValid) {
            if (errors.email) throw errors.email;
            else {
                throw errors.password
            }
        }

        let user = await getUser("email", email);

        if (!user) throw 'User does not exist';
        if (!user.verifyPassword(password)) throw 'Password is incorrect';

        let accessToken = await getJWTToken({ userId: user._id, email, subject, salt: user.salt });

        user._doc.accessToken = accessToken;
        user.password = null;



    } catch (error) {

    }
}