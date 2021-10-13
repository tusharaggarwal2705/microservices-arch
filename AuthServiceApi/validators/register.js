const Validator = require("validator");
const isEmpty = require('../utils/isEmpty');

exports.validateRegisterInput = (data) => {
    let errors = {}; //here we set the empty errors object

    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.phoneNumber = !isEmpty(data.phoneNumber) ? data.phoneNumber : ""


    if (!Validator.isLength(data.firstName, { min: 2, max: 30 })) {
        errors.firstName = "First Name must be between 2 and 30 characters";
    }


    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "First Name field is required";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }

    if (Validator.isEmpty(data.phoneNumber)) {
        errors.phoneNumber = "Phone number field is required";
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }


    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
        errors.password = "Password must be at least 8 characters";
    }

    if (!Validator.isLength(data.phoneNumber, { min: 10, max: 10 })) {
        errors.password = "Phone number can have max 10 digits";
    }

    if (!Validator.isMobilePhone(data.phoneNumber)) {
        errors.phoneNumber = "Phone number is invalid"
    }


    return {
        errors,
        isValid: isEmpty(errors) //if errors object is empty as we initialize above to at the end of all validation its mean all validation correct in case any validation fail so errors object get fill by its actual validation errors and the errors object not empty anymore then its set the value of isValid and return to the register api with value of isValid.
    };
};
