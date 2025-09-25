import Joi from "joi";

export const companyFormSchema = Joi.object({
  cnpj: Joi.string().required().messages({
    "string.empty": "CNPJ é obrigatório",
  }),

  razaoSocial: Joi.string().max(100).required().messages({
    "string.empty": "Razão Social é obrigatória",
    "string.max": "Máximo de 100 caracteres",
  }),

  nomeFantasia: Joi.string().max(100).required().messages({
    "string.empty": "Nome Fantasia é obrigatório",
    "string.max": "Máximo de 100 caracteres",
  }),

  cep: Joi.string().required().messages({
    "string.empty": "CEP é obrigatório",
    "string.pattern.base": "Formato de CEP inválido",
  }),

  estado: Joi.string().length(2).required().messages({
    "string.empty": "Estado é obrigatório",
    "string.length": "Estado deve ter 2 caracteres",
  }),

  municipio: Joi.string().required().messages({
    "string.empty": "Município é obrigatório",
    "string.max": "Máximo de 100 caracteres",
  }),

  logradouro: Joi.string().allow("").optional(),

  numero: Joi.number()
    .integer()
    .positive()
    .allow(null, "")
    .optional()
    .messages({
      "number.base": "Deve ser um número",
      "number.integer": "Deve ser um número inteiro",
      "number.positive": "Deve ser um número positivo",
    }),

  complemento: Joi.string().max(300).allow("").optional().messages({
    "string.max": "Máximo de 300 caracteres",
  }),
});

export type CompanyFormData = {
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  cep: string;
  estado: string;
  municipio: string;
  logradouro?: string;
  numero?: number | string | null;
  complemento?: string;
};
