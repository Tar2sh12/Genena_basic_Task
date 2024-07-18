import { Router } from "express";
import { errorHandler } from "../../middleware/error-handling.middleware.js";
import * as customers from "./customer.conrtoller.js";
import { validationMiddleware } from "../../middleware/validation.middleware.js";
import { deleteSchema, getByIdSchema, SignUpSchema, updateSchema } from "./customer.schema.js";
const router = Router();
router.post(
  "/signUp",
  errorHandler(validationMiddleware(SignUpSchema)),
  errorHandler(customers.signUp)
);

router.put(
  "/update/:_id",
  errorHandler(validationMiddleware(updateSchema)),
  errorHandler(customers.updateUser)
);
router.delete(
  "/delete/:_id",
  errorHandler(validationMiddleware(deleteSchema)),
  errorHandler(customers.deleteUser)
);
router.get(
  "/getInfo",
  errorHandler(customers.getInfo)
);
router.get(
  "/getById/:_id",
  errorHandler(validationMiddleware(getByIdSchema)),
  errorHandler(customers.getById)
);
export default router;
