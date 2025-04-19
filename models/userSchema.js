const Joi = require("joi");

// Schema Validation using Standard Structure
const userSchema = {
  data: Joi.object({
      userName: Joi.string().trim().min(4).max(50).required().messages({
        'string.empty': 'Username is required',
        'string.min': 'Username must be at least 4 characters',
        'string.max': 'Username should not exceed 50 characters',
        'any.required': 'Username is required'
    }),
      email: Joi.string().email().required().messages({
        'string.email': 'Please enter a valid email address',
        'any.required': 'Email is required'
    }),
      password: Joi.string().trim().min(8).max(50).required().messages({
        'string.empty': 'Password is required',
        'any.required': 'Password is required',
        'string.min': 'Password must be at least 8 characters',
        'string.max': 'Password should not exceed 50 characters',
    }),
      mobileNumber: Joi.string().trim().min(10).max(10).required().messages({
        'string.empty': 'Mobile number is required',
        'any.required': 'Mobile number is required',
        'string.min': 'Mobile number should be 10 digit',
        'string.max': 'Mobile number should be 10 digit',
    }),
      isActive: Joi.boolean().default(true)
  })
};

module.exports = userSchema;