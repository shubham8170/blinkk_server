const Joi = require('joi');



const validateUser = (user) => {
    console.log(user);
    const JoiSchema = Joi.object({
        username: Joi.string()
            .min(5)
            .max(30)
            .optional(),
        email: Joi.string()
            .email()
            .min(5)
            .required(),
    });
    return JoiSchema.validate(user)
}

module.exports=validateUser;