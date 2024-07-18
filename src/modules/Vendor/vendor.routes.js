import { Router } from "express";
import { errorHandler } from "../../middleware/error-handling.middleware.js";
import * as vendors from "./vendor.controller.js";
import { validationMiddleware } from "../../middleware/validation.middleware.js";
import { deleteSchema, getByIdSchema, SignUpSchema, updateSchema } from "./vendor.schema.js";
const router = Router();
router.post(
  "/signUp",
  errorHandler(validationMiddleware(SignUpSchema)),
  errorHandler(vendors.signUp)
);

router.put(
  "/update/:_id",
  errorHandler(validationMiddleware(updateSchema)),
  errorHandler(vendors.updateUser)
);
router.delete(
  "/delete/:_id",
  errorHandler(validationMiddleware(deleteSchema)),
  errorHandler(vendors.deleteUser)
);
router.get(
  "/getInfo",
  errorHandler(vendors.getInfo)
);
router.get(
  "/getById/:_id",
  errorHandler(validationMiddleware(getByIdSchema)),
  errorHandler(vendors.getById)
);
export default router;
