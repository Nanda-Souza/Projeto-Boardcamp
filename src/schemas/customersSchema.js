import joi from 'joi'

export const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.number().required(),
    cpf: joi.number().required(),
    birthday: joi.number().required()
});
