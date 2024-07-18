import Joi from "joi";
import { generalRules } from "../../utils/general-rules.utils.js";

export const SignUpSchema = {
  body: Joi.object({
    name: Joi.string().min(3).max(30).alphanum().required(),
    address: Joi.string().min(3).max(30).alphanum().required(),
    groupid: generalRules.groupid,
  }),
};

export const updateSchema = {
  body: Joi.object({
    name: Joi.string().min(3).max(30).alphanum().optional(),
    address: Joi.string().min(3).max(30).alphanum().optional(),
    groupid: generalRules.groupid.optional(),
  }),
  params: generalRules.objectId,
};

export const deleteSchema = {
  params: generalRules.objectId,
};

export const getByIdSchema = {
  params: generalRules.objectId,
};
