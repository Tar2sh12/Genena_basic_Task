import Joi from "joi";
import { generalRules } from "../../utils/general-rules.utils.js";

export const addGroupSchema = {
  body: Joi.object({
    name: Joi.string().min(3).max(30).alphanum().required(),
  }),
};
export const updateSchema = {
    body: Joi.object({
      name: Joi.string().min(3).max(30).alphanum().optional(),
    }),
    params: generalRules.objectId,
  };
  
  export const deleteSchema = {
    params: generalRules.objectId,
  };
  
  export const getByIdSchema = {
    params: generalRules.objectId,
  };