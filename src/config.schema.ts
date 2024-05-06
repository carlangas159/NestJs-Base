import * as Joi from '@hapi/joi';

export const constValidationSchema = Joi.object({
	STAGE: Joi.string().default('dev').required(),
	DB_TYPE: Joi.string().default('mysql').required(),
	DB_HOST: Joi.string().default('localhost').required(),
	DB_PORT: Joi.number().default(3306).required(),
	DB_USERNAME: Joi.string().default('root').required(),
	DB_PASSWORD: Joi.string().default('toor').required(),
	DB_DATABASE: Joi.string().default('database').required(),
	APP_KEY: Joi.string().required(),
});