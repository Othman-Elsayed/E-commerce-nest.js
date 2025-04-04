import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'staging', 'production')
    .required(),
  MONGO_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
