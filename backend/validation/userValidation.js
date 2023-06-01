import Joi from 'joi';

const userSchema = Joi.object({
  fname: Joi.string().required(),
  lname: Joi.string().required(),
  username: Joi.string().required(),
  uemail: Joi.string().email().required(),
  upassword: Joi.string().pattern(/^(?=.*[A-Z])/).min(6).required(),
  upicture: Joi.allow(''),
  updateAt: Joi.date().iso().allow('')
});

const userUpdateSchema = Joi.object({
  fname: Joi.string().allow(''),
  lname: Joi.string().allow(''),
  username: Joi.string().allow(''),
  uemail: Joi.string().email().allow(''),
  upassword: Joi.string().pattern(/^(?=.*[A-Z])/).min(6).allow(''),
  upicture: Joi.string().allow(''),
  updateAt: Joi.date().iso().allow('')
});

export const validationUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    // Validation failed
    const errorMessage = error.details[0].message;
    console.log("error",errorMessage)
    return res.status(400).json({ error: errorMessage });
  }

  next();
};

export const validationUpdateUser = (req, res, next) => {
  const { error } = userUpdateSchema.validate(req.body);

  if (error) {
    // Validation failed
    const errorMessage = error.details[0].message;
    return res.status(400).json({ error: errorMessage });
  }

  next();
};
