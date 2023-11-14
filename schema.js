const Joi = require('joi');
const { number } = require('joi');

module.exports.campGroundSchema = Joi.object({
    Campground: Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()
    }).required()
});